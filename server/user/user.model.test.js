const chai = require('chai');
const should = chai.should();
const User = require('./user.model');

beforeEach(() => {
  return User.remove({}).exec();
})

describe('User model', () => {
  it('should work as expected', (done) => {
    const user = new User();
    user.recipes.push({ recipe: {}, queries: [] });
    const userRecipe = user.recipes[user.recipes.length -1];
    Object.assign(userRecipe.recipe, { description: 'toto' });
    userRecipe.queries = [{ id: 1 }, { id: 2 }];
    user.save()
      .then(user => {
        user._id.should.be.a('object');
        const recipe = user.recipes[0];
        recipe._id.should.be.a('object');
        recipe.recipe.description.should.equal('toto');
        recipe.queries.should.have.lengthOf(2);
        recipe.queries[0].id.should.be.a('number');
        recipe.queries[0].should.not.have.property('_id');
        done();
      })
      .catch(done);
  })
});
