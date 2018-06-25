'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
      'GroceryItems',
      'shoppingListId',{
        type : Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : 'ShoppingLists',
          key : 'id'
        }
      }
    )

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.removeColumn(
        'GroceryItems',
        'shoppingListId'
      )

  }
};
