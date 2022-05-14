$(function () {
  gsap.registerPlugin(ScrollTrigger);

  // loading screen
  loading = gsap.timeline({
    defaults: {
      delay: 1,
      ease: Power3.easeIn,
    },
  });

  loading
    .addLabel("start")
    .to(".loader .left", { left: "-50%" }, "start")
    .to(".loader .right", { right: "-50%" }, "start")
    .to(".loader", { "z-index": 0 }, "start");

  // mouse effect
  $(".video_wrap").on("mousemove", (e) => {
    xVal = e.offsetX - 35;
    yVal = e.offsetY - 35;

    gsap.to(".video_cursor", {
      x: xVal,
      y: yVal,
    });
  });

  $(".video_wrap").on("mouseleave", (e) => {
    wHalf = $(".video_wrap").width() / 2 - 35; //(커서크기의 절반)
    hHalf = $(".video_wrap").height() / 2 - 35; //(커서크기의 절반)
    gsap.to(".video_cursor", {
      x: wHalf,
      y: hHalf,
    });
  });

  // nav
  $(".nav .nav_container .container ul li").mouseover(function () {
    $(this).find(".image").addClass("on");
  });

  $(".nav_btn").click(function (e) {
    e.preventDefault(); // a 태그의 본래 link 이벤트를 막음

    if ($(this).hasClass("on")) {
      $(".nav").removeClass("on");
      $("body").removeClass("hidden");

      $(".nav_bg").removeClass("on");
      $(this).removeClass("on");
      $("header .logo").stop().delay(400).animate({ opacity: 1 }, 500);
      $(".nav_bottom .container").css("opacity", 0);
      $(".nav_container .container").css("opacity", 0);
      $(".nav_images").css("display", "block");
    } else {
      $(".nav").addClass("on");
      $("body").addClass("hidden");

      $(".nav_bg").addClass("on");
      $(this).addClass("on");
      $("header .logo").css("opacity", 0);
      $(".nav_bottom .container").css("opacity", 1);
      $(".nav_container .container")
        .stop()
        .delay(200)
        .animate({ opacity: 1 }, 500);
      $(".nav_images").css("display", "block");
    }
  });

  $(".nav_container > .container li .title").hover(
    function () {
      target = $(this).closest("li").index();

      $(".nav_images .container .image").show().eq(target).siblings().hide();
    },
    function () {
      $(".nav_images .container .image").hide();
    }
  );

  motion01 = gsap.timeline({
    scrollTrigger: {
      trigger: ".sc_visual",
      start: "top 0",
      end: "bottom top",
      scrub: 1,
    },
    defaults: {
      stagger: 0.1,
    },
  });

  motion01
    .addLabel("move2")
    .to(".visual_l", { xPercent: -100 }, "move2")
    .to(".visual_r", { scale: 0.7 }, "move2");

  motion02 = gsap.timeline({
    defaults: {
      stagger: 0.1,
    },
  });

  motion02
    .addLabel("move1")
    .to(".logo_l", { left: 30, opacity: 0, duration: 0.5 }, "move1")
    .to(".logo_r", { left: 80, opacity: 0, duration: 0.5 }, "move1")
    .to(".nav_btn", { opacity: 0, duration: 0.5 }, "move1");

  ScrollTrigger.create({
    animation: motion02,
    trigger: ".sc_visual",
    start: "10% 0",
    end: "10% top",

    onEnterBack: () => {
      motion02.reverse();
    },
  });

  zoom = gsap
    .timeline({})
    .from(".sc_nature .image", {
      scale: 4.1,
      transformOrigin: "56% 32%",
      duration: 20,
      ease: "none",
    })
    .from(
      ".sc_nature .titles",
      {
        opacity: 0,
        duration: 2,
        ease: "none",
      },
      10
    )
    .set("body", {
      "background-color": "#eae6dd",
    });

  ScrollTrigger.create({
    animation: zoom,
    trigger: ".sc_nature",
    scrub: !0,
    pin: !0,
    end: "+=250%",
  });

  grid = gsap.timeline({
    scrollTrigger: {
      trigger: ".sc_modern",
      scrub: 0.5,
      pin: true,
      start: "top top",
      end: "+=250%",
    },
  });
  grid
    .addLabel("start", "+=1.5")
    .to(
      ".sc_modern .title",
      {
        opacity: 0,
        duration: 3,
      },
      "start"
    )
    .fromTo(
      ".sc_modern .images_wrap",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 4,
      },
      "start"
    )
    .to(
      ".sc_modern .images_wrap .image",
      {
        x: 0,
        y: 0,
        scale: 1,
        duration: 6,
      },
      "start"
    )
    .to("body", {
      ease: "none",
      duration: 1,
      "background-color": "#fff",
    });

  // sc_hrz
  const hrz = gsap.timeline({
    scrollTrigger: {
      trigger: ".sc_hrz",
      scrub: 0.5,
      pin: true,
      start: "top top",
      end: "+=550%",
    },
    defaults: {
      ease: "none",
    },
  });

  let w = 0;

  $(".sc_hrz > div > div").each(function (index, item) {
    ee = $(this).outerWidth();
    w += ee;
  });
  totalW = w - $(window).innerWidth();

  hrz
    .to(".sc_hrz .wrap", {
      x: -totalW,
      duration: 9,
    })
    .to("body", {
      duration: 1,
      ease: "none",
      "background-color": "#c4bfb8",
    })
    .fromTo(
      ".sc_hrz .cnt4 .title",
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );

  $(".scroll_text h2").each(function (index, item) {
    const el = $(this).parent();

    gsap.to(item, {
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
      x: "-10%",
      duration: 1,
      ease: "none",
    });
  });

  const motionTxt = new SplitType(".sc_home .line", { types: "words, chars" });

  gsap.fromTo(
    motionTxt.chars,
    {
      opacity: 0,
    },
    {
      scrollTrigger: {
        trigger: ".sc_home",
        start: "top bottom",
        end: "bottom top",
        // markers: true,
      },
      y: 20,
      opacity: 1,
      duration: 1,
      stagger: 0.05,
      ease: "none",
    }
  );
});
