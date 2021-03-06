import React, { useEffect } from "react";
import { connect } from "react-redux";
import RecipeList from "../RecipeList";
import UserPageHeader from "../UserPageHeader";
import { getRecipesRequest } from "../../state/Recipe/thunks.js";
import { Link } from "react-router-dom";
import Action from "../alerts/Action";

const Recipes = ({ user, recipes, getRecipes }) => {
  useEffect(() => {
    if (user._id) {
      getRecipes(user._id);
    }
  }, [user._id, getRecipes]);

  return (
    <>
      <UserPageHeader
        name={`${user.firstName} ${user.lastName}`}
        avatar={user.avatar}
      >
        {recipes && recipes.length > 0 ? (
          <RecipeList recipes={recipes} />
        ) : (
          <Action
            message={`You currently do not have any recipes. To add your first recipe, click more info.`}
            action="More Info"
            link="/add-recipe"
          />
        )}
      </UserPageHeader>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  recipes: state.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  getRecipes: (userId) => dispatch(getRecipesRequest(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
