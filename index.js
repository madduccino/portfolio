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
      "One of the biggest projects I've worked on is WoofJS. Woof teaches kids JavaScript through making web-based games like this one...",
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
    $(".bi").hover(handlerIn, handlerOut);
  };
  var count = 0;

  const handlerIn = () => {
    if (count === 0) $(".bi").append('<div class="cont">Continue</div>');
    count = 1;
  };
  const handlerOut = () => {
    $(".cont").remove();
    count = 0;
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

    setBackdropColor("black");

    forever(() => {
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
    });
    // start WoofJS.com

    setBackdropColor("black");
    var jumping = false;
    var go = false;

    var line = new Text({
      text: () => "Catch the biggest star!",
      color: "white",
      y: 100,
      size: 25,
    });

    var line1 = new Text({
      text: () => "Use the arrow keys or click/tap to move left and right",
      color: "white",
      y: 65,
      size: 15,
    });

    var line2 = new Text({
      text: () => "Press space or click/tap alien to jump",
      color: "white",
      y: 35,
      size: 15,
    });

    var line3 = new Text({
      text: () => "Head on over to the exit sign to leave",
      color: "white",
      y: 5,
      size: 15,
    });

    var line4 = new Text({
      text: () => "Click/tap alien to continue",
      color: "white",
      y: -25,
      size: 25,
      showing: false,
    });

    after(2, "second", () => {
      every(1, "second", () => {
        if (!go) {
          line4.show();
        }
      });
      every(2, "second", () => {
        line4.hide();
      });
    });

    var instructions = [line, line1, line2, line3, line4];
    onMouseDown(() => {
      if (!go && alien.mouseOver) {
        instructions.forEach((line) => {
          go = true;
          line.hide();
        });
      }
    });

    every(1, "second", () => {
      after(1, "second", () => {
        if (go) {
          time++;
        }
      });
    });

    instructions.forEach((line) => {
      if (!go && mouseDown) {
        go = true;
        line.hide();
      }
    });

    var background = new Image({
      url: "https://madduccino.com/images/background.png",
    });

    var exit = new Text({
      text: () => "Exit =>",
      color: "white",
      size: 25,
      x: maxX - 70,
      y: minY + 35,
    });
    var costumes = [
      "https://www.madduccino.com/images/baby-alien-walking1.png",
      "https://www.madduccino.com/images/baby-alien-walking2.png",
      "https://www.madduccino.com/images/baby-alien-walking3.png",
      "https://www.madduccino.com/images/baby-alien-walking4.png",
      "https://www.madduccino.com/images/baby-alien-walking5.png",
      "https://www.madduccino.com/images/baby-alien-walking6.png",
      "https://www.madduccino.com/images/baby-alien-walking7.png",
      "https://www.madduccino.com/images/baby-alien-walking8.png",
      "https://www.madduccino.com/images/baby-alien-walking9.png",
      "https://www.madduccino.com/images/baby-alien-walking10.png",
      "https://www.madduccino.com/images/baby-alien-walking11.png",
      "https://www.madduccino.com/images/baby-alien-walking12.png",
      "https://www.madduccino.com/images/baby-alien-walking13.png",
      "https://www.madduccino.com/images/baby-alien-walking14.png",
      "https://www.madduccino.com/images/baby-alien-walking15.png",
      "https://www.madduccino.com/images/baby-alien-walking16.png",
    ];

    var n = 0;

    var alien = new Image({
      url: costumes[0],
      width: 100,
      height: 150,
      x: minX + 50,
      y: maxY,
      xvel: 10,
    });

    var yvel = -5;
    var ground = minY + alien.height / 2 + 7;

    var planets = [];

    var planet = new Image({
      url: "https://madduccino.com/images/planet.png",
      width: 50,
      height: 50,
      y: ground - 50,
      x: 140,
    });

    var planet2 = new Image({
      url: "https://madduccino.com/images/planet.png",
      width: 50,
      height: 50,
      y: ground,
      x: -100,
    });

    var planet3 = new Image({
      url: "https://madduccino.com/images/planet.png",
      width: 50,
      height: 50,
      y: planet2.y + 100,
      x: planet2.x + 150,
    });

    var planet4 = new Image({
      url: "https://madduccino.com/images/planet.png",
      width: 50,
      height: 50,
      y: planet3.y + 80,
      x: planet3.x - 180,
    });

    var planet5 = new Image({
      url: "https://madduccino.com/images/planet.png",
      width: 50,
      height: 50,
      y: planet3.y + 200,
      x: planet3.x + 20,
    });

    var planet6 = new Image({
      url: "https://madduccino.com/images/planet.png",
      width: 50,
      height: 50,
      y: planet3.y + 200,
      x: planet3.x + 150,
    });

    planets.push(planet, planet2, planet3, planet4, planet5, planet6);

    var finish = new Image({
      url: "https://madduccino.com/images/star.png",
      width: 40,
      height: 40,
      x: planet6.x + 50,
      y: planet5.y + 160,
    });

    forever(() => {
      alien.y += yvel;
      yvel -= 0.3;
      if (alien.x > maxX) {
        alien.x = minX;
      }
      if (alien.x < minX) {
        alien.x = maxX;
      }
      if (alien.y <= ground) {
        yvel = 0;
        alien.y = ground;
      }
      jumping =
        go && (keysDown.includes("SPACE") || (mouseDown && mouseY > alien.y));
    });

    // var debug = new Text({
    //   text: () => jumping,
    //   color: "blue",
    //   y: -100,
    //   size: 50
    // })
    var xvel = 10;

    // INTERPLANETARY TRAVEL

    forever(() => {
      background.x = alien.x;
      background.y = alien.y;

      planets.forEach((planeto) => {
        planeto.sendToBack();
        if (alien.distanceTo(planeto) < 70 && alien.x != planeto.x) {
          alien.move(-xvel);
        }
        if (alien.distanceTo(planeto) < 70 && alien.y < planeto.y) {
          alien.move(-yvel);
        }
        if (
          alien.y > ground &&
          alien.y > planeto.y &&
          alien.touching(planeto) &&
          abs(planeto.x - alien.x) <= 40 &&
          !jumping
        ) {
          alien.y = planeto.y + planeto.height * 2 - 10;
          yvel = 0;
        }
        if (
          (alien.y === ground ||
            alien.y === planeto.y + planeto.height * 2 - 10) &&
          jumping
        ) {
          yvel = 8;
        }
        if (alien.touching(finish)) {
          finish.x = alien.x;
          finish.y = alien.y;
          alien.y -= 1;
          if (alien.y < ground) {
            alien.y = ground;
            finish.x = planet6.x + 50;
            finish.y = planet6.y + 160;
            time = 0;
          }
        }
      });
    });
    var time = 0;

    var timer = new Text({
      text: () => "Time: " + time,
      color: "white",
      x: minX + 60,
      y: maxY - 60,
      size: 30,
    });

    alien.setRotationStyle("ROTATE LEFT RIGHT");

    forever(() => {
      planet.sendToBack();
      line.sendToFront();
      line1.sendToFront();
      line2.sendToFront();
      line3.sendToFront();
      line4.sendToFront();
    });

    forever(() => {
      if (go) {
        if (
          keysDown.includes("RIGHT") ||
          (mouseDown &&
            mouseX > alien.x &&
            mouseY <= alien.y + alien.height / 2)
        ) {
          alien.angle = RIGHT;
          n++;
          if (n === costumes.length) {
            n = 0;
          }
          alien.setImageURL(costumes[n]);
          alien.move(xvel);
        }
        if (
          keysDown.includes("LEFT") ||
          (mouseDown &&
            mouseX < alien.x &&
            mouseY <= alien.y + alien.height / 2)
        ) {
          n++;
          if (n === costumes.length) {
            n = 0;
          }
          alien.setImageURL(costumes[n]);
          alien.angle = LEFT;
          alien.move(xvel);
        }
      }
    });

    var stars = [];
    range(0, 40).forEach((counter) => {
      var star = new Image({
        url: "https://madduccino.com/images/star.png",
        width: 10,
        height: 10,
        x: random(minX - 200, maxX + 200),
        y: random(minY - 200, maxY + 200),
      });
      stars.push(star);
    });

    forever(() => {
      stars.forEach((star) => {
        if (go) {
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
          if (stars.y > maxY || stars.y < minY) {
            stars.y = !stars.y;
          }
          if (stars.x > maxX || stars.y < minX) {
            stars.x = !stars.x;
          }
        }
      });
    });
  };

  $(".next i").click(async () => {
    $("body").css("backgroundColor", "rgb(129, 206, 232)");

    $(".wrapper").removeClass("fade").addClass("expand");

    console.log("yallo");
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
