var mouseover = false;

const showSkills = (s) => {
  $(s).children().last().fadeIn(2000);
};

const hideSkills = (s) => {
  $(s).children().last().fadeOut(200);
};
