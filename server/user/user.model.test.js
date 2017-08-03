const chai = require('chai');
const should = chai.should();
const User = require('./user.model');

beforeEach(() => {
  return User.remove({}).exec();
})

describe('User model', () => {
  it('should work as expected', (done) => {
    const user = new User();
    user.recipeInfos.push({ recipe: { links: [], status: 0 }, queries: [] });
    const userRecipe = user.recipeInfos[0];
    Object.assign(userRecipe.recipe, { description: 'toto' });
    user.save()
      .then(user => {
        user._id.should.be.a('object');
        const recipe = user.recipeInfos[0];
        recipe._id.should.be.a('object');
        recipe.recipe.description.should.equal('toto');
        recipe.queries.should.have.lengthOf(1);
        recipe.queries[0].taskIdentity.id.should.be.a('object');
        done();
      })
      .catch(done);
  })
});
