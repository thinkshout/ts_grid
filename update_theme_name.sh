#! /bin/bash

# our own little yeoman
#
# This script works on a theme that was started by copying T S _ G R I D.
# If the theme still has the name ts_grid sprinkled throughout, this does the
# job of changing those instances of 'ts_grid' to the new theme name.
# This script goes through the current directory and replaces instances with the new
# theme name and does so in place. (Does _not_ create a new directory or a new copy.)
# It also renames the directory from ts_grid to the new theme name if it is
# not already re-named.
#
# call like this:
# > cd theme/directory
# > update_theme_name.sh my_new_theme_name
#

  function setFirstLetterOfEachWordToUppercase {
    # white space instead of underscores
    nameWithWhiteSpace=`echo $1 | sed 's/_/ /g' `

    # Turn it into an array of words - each element is one word
    # Arrays are declared using parentheses votePedroArray=("vote" "for" "pedro")
    # Access individual array elements using brackets ${votePedroArray[0]}
    wordArray=(${nameWithWhiteSpace})

    FirstLetterOfEachWordToUppercaseResult=""
    for word in "${wordArray[@]}"
    do
      first=`echo $word|cut -c1|tr [:lower:] [:upper:]`
      second=`echo $word|cut -c2-`
      RESULT+=`echo " $first$second"`
    done

    # remove leading white space
    FirstLetterOfEachWordToUppercaseResult=`echo $RESULT | sed 's/^ //g' `
  }

  THEME_NAME=$1
  if [[ $# -eq 0 ]] ; then
    echo 'A new theme name is required. Call like this:'
    echo './update_theme_name.sh my_new_theme_name'
    echo 'replacing my_new_theme_name with the name you want to use.'
    exit 0
  fi

  setFirstLetterOfEachWordToUppercase $THEME_NAME
  NEW_HUMAN_READABLE_NAME=$FirstLetterOfEachWordToUppercaseResult
  OLD_HUMAN_READABLE_NAME="TS Grid"

  echo Theme name is $THEME_NAME
  # assumes the currently running script is inside the ts_grid directory that will be re-named
  THEME_DEST="$( cd "$(dirname "$0")" ; cd ..; pwd -P )"/$THEME_NAME
  CURRENT_DIR="$(pwd -P )"
  echo "Theme will be placed in $THEME_DEST"

  if [ $THEME_DEST != $CURRENT_DIR ]
  then
    mv $CURRENT_DIR $THEME_DEST
  fi

  PROJECT_NAME=$(echo $THEME_DEST | sed 's:.*/\(.*\)/web/.*:\1:g')

  # go through files and edit them replacing ts_grid with the new theme name
  sed "s/ts_grid_/${THEME_NAME}_/g" $THEME_DEST/ts_grid.theme >$THEME_DEST/$THEME_NAME.theme
  rm $THEME_DEST/ts_grid.theme

  sed "s/name: TS Grid/name: ${NEW_HUMAN_READABLE_NAME}/g" $THEME_DEST/ts_grid.info.yml | \
  sed "s/ts_grid/${THEME_NAME}/g" >$THEME_DEST/$THEME_NAME.info.yml
  rm $THEME_DEST/ts_grid.info.yml

  sed "s/ts_grid/${THEME_NAME}/g" $THEME_DEST/ts_grid.yml >$THEME_DEST/$THEME_NAME.yml
  rm $THEME_DEST/ts_grid.yml

  sed "s/ts_grid/${THEME_NAME}/g" $THEME_DEST/ts_grid.libraries.yml >$THEME_DEST/$THEME_NAME.libraries.yml
  rm $THEME_DEST/ts_grid.libraries.yml

  mv $THEME_DEST/composer.json $THEME_DEST/composer.child
  sed "s/ts_grid/${THEME_NAME}/g" $THEME_DEST/composer.child >$THEME_DEST/composer.json
  rm $THEME_DEST/composer.child

  mv $THEME_DEST/package.json $THEME_DEST/package.child
  sed "s/ts_grid/${THEME_NAME}/g" $THEME_DEST/package.child >$THEME_DEST/package.json
  rm $THEME_DEST/package.child

  # fix up the README file so it reflects the new theme name and location
  mv $THEME_DEST/README.md $THEME_DEST/README.md.child
  sed "s/ts_grid/${THEME_NAME}/g" $THEME_DEST/README.md.child | \
  sed "s/ts_grid/${THEME_NAME}/g" | \
  sed "s:/new-project-name/web/profiles/contrib/bene/themes/ts_grid where new-project-name is your project.:${THEME_DEST}:g" | \
  sed "s:can be found in a project called \"new-project-name\" here\: /new-project-name/web/profiles/contrib/bene/themes/ts_grid:can be found in a project called \"${PROJECT_NAME}\" here\: ${THEME_DEST}:g" | \
  sed "s/${OLD_HUMAN_READABLE_NAME}/${NEW_HUMAN_READABLE_NAME}/g" | \
  sed "s/new-project-name/${THEME_NAME}/g" >$THEME_DEST/README.md
  rm $THEME_DEST/README.md.child

  # self modifying code
  mv $THEME_DEST/update_theme_name.sh $THEME_DEST/update_theme_name.child
  sed "s/ts_grid/${THEME_NAME}/g" update_theme_name.child | \
  sed "s/ts_grid/${THEME_NAME}/g" | \
  sed "s/TS Grid/${NEW_HUMAN_READABLE_NAME}/g" | \
  sed "s/ts_grid/${THEME_NAME}/g" >$THEME_DEST/update_theme_name.sh
  chmod a+x $THEME_DEST/update_theme_name.sh
  rm $THEME_DEST/update_theme_name.child
