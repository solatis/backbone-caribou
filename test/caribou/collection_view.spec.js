/* jshint expr:true */
/* jshint -W024 */
define(['underscore', 'layoutmanager', 'caribou'], function(_, Layout, Caribou) {

    var ItemView = Layout.extend({
        tagName: 'span',
        template: _.template('<%= foo %>')
    });

    var EmptyView = Layout.extend({
        tagName: 'span',
        className: 'isempty'
    });

    var CollectionView = Caribou.CollectionView.extend({
        ItemViewType: ItemView,
        EmptyViewType: EmptyView
    });

    chai.factory.define('collection', function (attributes) {
        return new Backbone.Collection(
            attributes || [{foo: 'wom'}, {foo: 'bat'}]);
    });

    // Creates a collection view with a pre-filled collection.
    chai.factory.define('collection_view', function (attributes) {
        return new CollectionView(
            _.extend(
                {
                    collection: chai.factory.create('collection')
                }, attributes));
    });

    // Creates a ccollection view with an empty collection
    chai.factory.define('empty_collection_view', function (attributes) {
        return new CollectionView(
            _.extend(
                {
                    collection: chai.factory.create('collection', [])
                }, attributes));
    });

    describe('when rendering a collection view with no itemview', function () {
        var collectionView;

        beforeEach(function () {
            collectionView = chai.factory.create('collection_view', {ItemViewType: undefined});
        });

        it('should throw an error', function () {
            expect(function () {collectionView.render ();}).to.throw('An ItemViewType must be specified');
        });
    });

    describe('when rendering an empty collectionview with no emptyview', function () {
        var collectionView;

        beforeEach(function () {
            collectionView = chai.factory.create('empty_collection_view', {EmptyViewType: undefined});
            collectionView.render();
        });

        it('should have no child views', function () {
            _.size(collectionView.getViews().value()).should.equal(0);
        });

        it('should have empty inner html', function () {
            collectionView.$el.should.have.html('');
        });
    });

    describe('when creating a pre-filled collection view', function () {
        var collectionView = chai.factory.create('collection_view');

        it('should not have created any child views yet', function () {
            expect(collectionView.getViews().value()).to.be.empty;
        });
    });

    describe('when creating a pre-filled collection view', function() {
        var collectionView;

        beforeEach(function () {
            collectionView = chai.factory.create('collection_view');

            // Spy the main functions
            sinon.spy(collectionView, 'trigger');
            sinon.spy(collectionView, 'render');
        });

        it('should not be rendered yet', function() {
            collectionView.render.called.should.be.false;
        });

        it('should have no child views yet', function() {
            collectionView.getViews().value().should.be.empty;
        });

        it('should have an empty DOM element', function () {
            collectionView.$el.should.have.html('');
        });
    });

    describe('when rendering a pre-filled collection view', function () {
        var collectionView;

        beforeEach(function () {
            collectionView = chai.factory.create('collection_view');

            // Spy the main functions
            sinon.spy(collectionView, 'trigger');
            sinon.spy(collectionView, 'render');

            // Replace the function that builds the child views with a factory that
            // automatically spies on the trigger function.
            expect(collectionView._itemViewFactory).to.be.a('function');
            collectionView._itemViewFactory = function () {
                // Call the original factory
                var view = CollectionView.prototype._itemViewFactory.apply(collectionView, arguments);

                // Spy on the 'trigger' function
                sinon.spy(view, 'trigger');
                sinon.spy(view, 'render');

                // And return the view!
                return view;
            };

            collectionView.render();
        });

        it('should have called item:add:before for each child object', function () {
            collectionView.trigger.calledWith('item:add:before').should.be.true;
        });

        it('should have two child views', function () {
            collectionView.getViews().value().should.have.length(2);
        });

        it('should have rendered itself', function () {
            collectionView.render.calledOnce.should.be.true;
        });

        it('should have all its child views rendered', function () {

            function viewRendered (view) {
                // Expect our 'render' function to be called exactly once
                return view.render.calledOnce &&

                    // And expect the proper triggers to fire
                    view.trigger.calledWith('beforeRender') &&
                    view.trigger.calledWith('afterRender') &&

                    // And expect those triggers to be the only ones that fired
                    view.trigger.calledTwice;

            }

            collectionView.getViews().value().should.all.satisfy(viewRendered);
        });

        it('should have a filled DOM element', function () {
            collectionView.$el.should.have.html('<span>wom</span><span>bat</span>');
        });
    });

    describe('when rendering an empty collection view', function () {
        var collectionView;

        beforeEach(function () {
            collectionView = chai.factory.create('empty_collection_view');

            // Spy the main functions
            sinon.spy(collectionView, 'trigger');
            sinon.spy(collectionView, 'render');

            // And ensure the view is rendered
            collectionView.render();
        });

        it('should have rendered itself', function () {
            collectionView.render.calledOnce.should.be.true;
        });

        it('should have one child view', function() {
            _.size(collectionView.getViews().value()).should.equal(1);
        });

        it('should append the html for the emptyview', function () {
            collectionView.$el.should.have.html('<span class="isempty"></span>');
        });
    });

    describe('when adding an item to a previously rendered empty view', function () {
        var collection, collectionView;

        beforeEach(function () {
            collectionView = chai.factory.create('empty_collection_view');
            collection = collectionView.collection;

            // Note that we add an item *after* we call .render()
            collectionView.render();

            collection.add([{foo: 'bar'}]);
        });

        it('should have the html for the item view', function () {
            collectionView.$el.should.have.html('<span>bar</span>');
        });

        it('should have a single child view', function () {
            _.size(collectionView.getViews().value()).should.equal(1);
        });
    });

    describe('when adding an item to a previously rendered non-empty view', function () {
        var collection, collectionView;

        beforeEach(function () {
            collectionView = chai.factory.create('collection_view');
            collection = collectionView.collection;

            // Note that we add an item *after* we call .render()
            collectionView.render();

            collection.add([{foo: 'foo'}]);
        });

        it('should have the html for both item views', function () {
            collectionView.$el.should.have.html('<span>wom</span><span>bat</span><span>foo</span>');
        });

        it('should containi each of the rendered child views', function () {
            _.size(collectionView.getViews().value()).should.equal(3);
        });
    });

    describe('when removing an item from a previously rendered non-empty collection view', function () {
        var collection, collectionView;

        beforeEach(function () {
            collectionView = chai.factory.create('collection_view');
            collection = collectionView.collection;

            // Note that we add an item *after* we call .render()
            collectionView.render();

            // Remove the first item
            collection.shift();
        });

        it('should have the html of the item that is left', function () {
            collectionView.$el.should.have.html('<span>bat</span>');
        });

        it('should reference only a single child view', function () {
            _.size(collectionView.getViews().value()).should.equal(1);
        });
    });

    describe('when an empty collection is first rendered and then reset with different items', function () {
        var collectionView;

        beforeEach(function () {
            collectionView = chai.factory.create('empty_collection_view');
            var collection = collectionView.collection;

            // Note that we add an item *after* we call .render()
            collectionView.render();

            collection.reset([{foo: 'wom'}, {foo: 'bat'}]);
        });

        it('should have the html of the items that is left', function () {
            collectionView.$el.should.have.html('<span>wom</span><span>bat</span>');
        });

        it('should reference two child views', function () {
            _.size(collectionView.getViews().value()).should.equal(2);
        });
    });

    describe('when an filled collection is first rendered and then reset with an empty set', function () {
        var collectionView;

        beforeEach(function () {
            var collection  = new Backbone.Collection([{foo: 'wom'}, {foo: 'bat'}]);
            collectionView = new CollectionView({collection: collection});

            // Note that we add an item *after* we call .render()
            collectionView.render();

            collection.reset();
        });

        it('should have the html of the empty view', function () {
            collectionView.$el.should.have.html('<span class="isempty"></span>');
        });

        it('should reference one child view', function () {
            _.size(collectionView.getViews().value()).should.equal(1);
        });
    });


    describe('when adding an item to an un-rendered collection', function () {
        var collectionView;
        
        beforeEach(function () {
            collectionView = chai.factory.create('empty_collection_view');
            var collection = collectionView.collection;

            collection.add({foo: 'wom'});
        });

        it('should have no html', function () {
            collectionView.$el.should.have.html('');
        });

        it('should reference one child view', function () {
            _.size(collectionView.getViews().value()).should.equal(1);
        });
    });

});
