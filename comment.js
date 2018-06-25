'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    ispublished: DataTypes.BOOLEAN
  }, {});

  Comment.associate = function(models) {

      // comment belongs to a post
      Comment.belongsTo(models.Post,{ as : 'post', foreignKey : 'postid'})

  };
  return Comment;
};
