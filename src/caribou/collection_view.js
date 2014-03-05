// CollectionView
// --------
// A view that iterates over a Backbone.Collection
// and renders an individual ItemView for each model.
define(['underscore', 'backbone', 'layoutmanager'], function(_, Backbone, Layout) {
    return Layout.extend({
        constructor: function () {
            Layout.apply(this, arguments);

            this._bindEvents();
        },

        _bindEvents: function () {
            if (this.collection) {
                this.listenTo(this.collection, 'add',    this._addAndRenderItem, this);
                this.listenTo(this.collection, 'remove', this._removeItem,       this);

                // Since our render() funtion is responsible for scrubbing and re-creating
                // all our views, a complete reset of the contents of the collection can
                // be handled by simply issueing a re-render.
                this.listenTo(this.collection, 'reset',  this.render,            this);
            }
        },

        beforeRender: function () {
            // Note that all child views are always scrubbed before re-rendering, so
            // all we need to do at this point is add all the views we require.
            //
            // For each element in our collection, create a new child view.
            this.collection.each(this._addItem, this);

            // When our collection is empty, and the end-user specified that they
            // want to use an empty view in this case, ensure it is rendered.
            if (_.size(this.collection) === 0 && this.EmptyViewType) {
                this._emptyView = this._emptyViewFactory();
                this._addView(this._emptyView);
            }
        },

        _addAndRenderItem: function (model) {
            if (this._emptyView) {
                this.removeView(this._emptyView);
                this._emptyView = null;
            }

            var view = this._addItem(model);

            if (this.hasRendered) {
                view.render();
            }

            return view;
        },

        _addItem: function (model) {
            return this._addView(this._itemViewFactory(model));
        },

        _addView: function (view) {
            this.trigger('item:add:before', view);

            // Note that we're using the model as selector, which
            // is already part of the view.
            view = this.insertView(view);

            // If our parent view is already rendered, it means this
            // child view must be rendered too.
            this.trigger('item:add', view);
            this.trigger('item:add:after', view);

            return view;
        },

        _removeItem: function (model) {
            // We're using the item's model as selector
            var view = this.getView({model: model});

            this.trigger('item:remove:before', view);
            view.remove();

            this.trigger('item:remove', view);
            this.trigger('item:remove:after', view);
        },

        _itemViewFactory: function (model) {
            if (!this.ItemViewType) {
                throw 'An ItemViewType must be specified';
            }

            return new this.ItemViewType({model: model});
        },

        _emptyViewFactory: function () {
            return new this.EmptyViewType();
        }
    });
});
