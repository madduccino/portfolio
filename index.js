$(document).ready(function () {
  // Hamburger Menu
  $(".menu").click(() => {
    $(".menu-items").css("display", "flex");
    $(".menu").css("display", "none");
  });
  $(".close").click(() => {
    $(".menu-items").css("display", "none");
    $(".menu").css("display", "block");
  });

  let screenText = "";
  let index = 0;
  let countSlides = 1;

  const screens = {
    text: [
      "madduccino",
      "Hi, my name's Maddy. I'm a developer and run a company that teaches kids how to code.",
      "The most influential project I've contributed to is WoofJS. Woof teaches kids JavaScript through making web-based games like this one...",
      "Woof has over 8,000 users and has been adopted by teachers around the world. It was built with Vue, HTML Canvas, and Firebase. You can view my contributions on <a href='github.com'>Github</a>.",
      "Learn more about my work.",
    ],
  };

  const playSound = () => {
    const pourSound = new Audio("./audio/coffee.wav");
    pourSound.currentTime = 0;
    pourSound.play();
    pourSound.addEventListener(
      "timeupdate",
      () => {
        if (pourSound.currentTime > 2) {
          pourSound.pause();
        }
      },
      false
    );
  };

  var music = new Sound({
    url: "./audio/afterlife.mp3",
    loop: true,
    speed: "normal",
    volume: "normal",
  });

  function delay(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }

  // Main Event
  // $(".fillme").click(screenFlow);

  // Typewriter text
  async function showText(txt, el) {
    let words = txt.split("");
    return await new Promise((resolve) => {
      const textInterval = setInterval(() => {
        if (index < words.length) {
          console.log("okay");
          screenText += words[index];
          $(el).html(screenText);
          index++;
        } else {
          resolve(console.log("All done"));
          clearInterval(textInterval);
          screenText = "";
          index = 0;
        }
      }, 50);
    });
  }

  // Control Flow
  async function screenFlow() {
    try {
      screen1();
      await delay(2500);
      screen2();
      await showText(screens.text[0], ".screen1");
      screen3();
      await delay(2500);
      await showText(screens.text[1], ".screen2");
      screen4a();
      await delay(500);
      $(".next").css("display", "block");
    } catch (e) {
    } finally {
    }
  }

  // Screens
  const screen1 = () => {
    // clicked++;
    // if (clicked === 1) {
    //   playSound();
    //   $(".fillme").css({
    //     animation: "none",
    //     backgroundColor: "#c71d11",
    //   });
    $(".cup").css("animation", "fill 2.5s forwards");
    // }
  };

  const screen2 = () => {
    $(".cup").addClass("tipover");
    $(".fillme").css("display", "none");
    $(".screen1").fadeOut(3000);
    $(".cup").fadeOut(2000);
  };

  const screen3 = () => {
    $(".wrapper").css({
      backgroundColor: "#81cee8",
    });
  };

  const screen4a = () => {
    $(".sky").css("display", "block");
    $(".screen2").append(
      "<div class='par'><div class='slideUp'><a target='_blank' href='https://thecodingspace.com'><img src='./images/rocket.png'><div class='sky'><div class='cloud'></div><p>Learn more about <br>The Coding Space</p></div></a>"
    );
  };

  const screen4 = async () => {
    $(".wrapper").addClass("fade");
    $(".wrapper").css({
      backgroundColor: "black",
    });
    $(".screen2").append(
      "<div class='par'><p class='slideUp'>Scroll <i class='bi bi-arrow-down-circle-fill'></i></p></div>"
    );
    await delay(500);
    $(".par").addClass("fadeText");
    $(window).bind("mousewheel", playWoof);
  };

  const woofGame = () => {
    music.startPlaying();

    var randomColors = ["CadetBlue", "Chartreuse", "DarkCyan"];

    var exit = new Text({
      text: () => "Exit",
      color: "white",
      size: 40,
      x: maxX - 50,
      y: minY + 50,
    });

    var background = new Image({
      url: "./images/background.png",
    });

    var costumes = [
      "./images/baby-alien-walking1.png",
      "./images/baby-alien-walking2.png",
      "./images/baby-alien-walking3.png",
      "./images/baby-alien-walking4.png",
      "./images/baby-alien-walking5.png",
      "./images/baby-alien-walking6.png",
      "./images/baby-alien-walking7.png",
      "./images/baby-alien-walking8.png",
      "./images/baby-alien-walking9.png",
      "./images/baby-alien-walking10.png",
      "./images/baby-alien-walking11.png",
      "./images/baby-alien-walking12.png",
      "./images/baby-alien-walking13.png",
      "./images/baby-alien-walking14.png",
      "./images/baby-alien-walking15.png",
      "./images/baby-alien-walking16.png",
    ];

    var n = 0;

    var alien = new Image({
      url: costumes[0],
      width: 100,
      height: 150,
      y: maxY + 150,
    });

    var yvel = -1;
    var xvel = 8;
    var ground = minY + alien.height / 2 + 7;

    forever(() => {
      after(0.1, "second", () => {
        alien.y += yvel;
        exit.sendToFront();
        yvel -= 0.3;
        if (alien.x >= maxX - 100) {
          alien.x = 0;
          setTimeout(() => {
            $("#project").css("display", "none");
            $(".screen2").css("display", "block");
            $(".wrapper").css(
              "backgroundColor",
              randomColors[Math.floor(Math.random() * randomColors.length)]
            );
            $(".menu div").addClass("white");

            $(window).bind("mousewheel", playWoof);
            $(".next").fadeIn();
            $(".next i").fadeIn();

            music.pausePlaying();
          }, 100);
        }
        if (alien.x <= minX) {
          alien.x = minX + 50;
        }
        if (alien.y <= ground) {
          yvel = 0;
          yvel.y = ground;
          if (keysDown.includes("SPACE")) {
            yvel = 8;
          }
        }
      });
    });

    var planet = new Image({
      url: "./images/planet.png",
      width: 50,
      height: 50,
      y: ground - 50,
      x: 140,
    });

    forever(() => {
      background.x = alien.x;
      background.y = alien.y;
      if (alien.distanceTo(planet) < 70 && alien.y === ground) {
        if (alien.y > ground) {
          xvel = 0;
        } else {
          alien.move(-xvel);
        }
      }
    });

    alien.setRotationStyle("ROTATE LEFT RIGHT");

    forever(() => {
      planet.sendToBack();
    });

    forever(() => {
      if (keysDown.includes("RIGHT")) {
        alien.angle = RIGHT;
        n++;
        if (n === costumes.length) {
          n = 0;
        }
        alien.setImageURL(costumes[n]);
        alien.move(xvel);
      }
      if (keysDown.includes("LEFT")) {
        n++;
        if (n === costumes.length) {
          n = 0;
        }
        alien.setImageURL(costumes[n]);
        alien.angle = LEFT;
        alien.move(xvel);
      }
    });

    var stars = [];
    range(0, 40).forEach((counter) => {
      var star = new Image({
        url: "./images/star.png",
        width: 10,
        height: 10,
        x: random(minX - 200, maxX + 200),
        y: random(minY - 200, maxY + 200),
      });
      stars.push(star);
    });

    forever(() => {
      stars.forEach((star) => {
        if (keysDown.includes("LEFT")) {
          star.move(2);
          stars.angle = RIGHT;
        }
        if (keysDown.includes("RIGHT")) {
          stars.angle = LEFT;
          star.move(-2);
        }
        if (yvel > 0) {
          star.y += 2;
        }
        if (yvel < 0) {
          star.y -= 2;
        }
      });
    });
  };

  $(".next i").click(async () => {
    $(".wrapper").removeClass("fade").addClass("expand");

    console.log(countSlides);
    if (countSlides === 1) {
      $(".wrapper").css("backgroundColor", "teal");
      $(".next i").css("display", "none");
      await showText(screens.text[2], ".screen2");
      screen4();
      countSlides = 2;
    } else if (countSlides === 2) {
      $(".next i").css("display", "none");
      $(".wrapper").css("backgroundColor", "silver");
      $(window).unbind("mousewheel", playWoof);
      await showText(screens.text[3], ".screen2");
      countSlides = 3;
      $(".next i").fadeIn();
    } else if (countSlides === 3) {
      moreProjects();
    }
  });

  let createdGame = false;

  const playWoof = (e) => {
    if (e.originalEvent.wheelDelta / 120 > 0) {
      console.log("scrolling up !");
    } else {
      console.log("scrolling down !");
      $(".wrapper").css({
        position: "fixed",
        top: 0,
        backgroundColor: "black",
      });
      $("#project").css("display", "block");
      $(window).unbind("mousewheel", playWoof);
      music.startPlaying();
      if (!createdGame) {
        woofGame();
        createdGame = true;
      }
    }
  };

  async function moreProjects() {
    window.location.href = "projects";
  }
  screenFlow();

  if ($("body").data("title") === "port") {
    portfolio();
  }

  async function portfolio() {
    await showText(screens.text[4], ".port");
    $(".projects").fadeIn();
  }

  $("#mycs").click(() => {
    $(".portfolio").css("backgroundColor", "#274548");
    $(".container").fadeOut();
  });
});

// Card 3
//My passions are animals, traveling, and just being creative
//Card 4
//I'm a full stack developer and currently run a computer science education company for kids."
