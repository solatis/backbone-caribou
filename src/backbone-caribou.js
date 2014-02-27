(function (root, factory) {
  if (typeof exports === 'object') {
    var underscore = require('underscore');
    var backbone = require('backbone');
    var layout = require('backbone.layoutmanager');

    module.exports = factory(underscore, backbone, layout);

  } else if (typeof define === 'function' && define.amd) {

    define(['underscore', 'backbone', 'backbone.layoutmanager'], factory);
  }
}(this, function (_, Backbone, Layout) {
  var Caribou = {};

  // CollectionView
  // --------
  // A view that iterates over a Backbone.Collection
  // and renders an individual ItemView for each model.
  Caribou.CollectionView = Layout.extend({
      constructor: function (options) {
          Layout.apply(this, arguments);

          this._bindEvents();
      },

      _bindEvents: function () {
          if (this.collection) {
              this.listenTo(this.collection, 'add',    this._addAndRenderItem, this);
              this.listenTo(this.collection, 'remove', this._removeItem,       this);
              this.listenTo(this.collection, 'reset',  this.render,            this);
          }
      },

      beforeRender: function () {
          this.collection.each(this._addItem, this);
      },

      _addAndRenderItem: function (model) {
          return this._addItem(model).render();
      },

      _addItem: function (model) {

          var view = this._buildItemView(model);
          this.trigger('item:add:before', view);

          // Note that we're using the model as selector, which
          // is already part of the view.
          view = this.insertView(view);
          //view.render()

          // If our parent view is already rendered, it means this
          // child view must be rendered too.
          console.log('rendering view?');
          console.log(this);

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

      _buildItemView: function (model) {
          return new this.ItemViewType({model: model});
      }
  });

  return Caribou;

}));
