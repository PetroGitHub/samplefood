$(function () {

  $('.review-slider__content').slick({
    dots: true,
    nextArrow: '<button type="button" class="slick-prev"><img src="images/next-arrow.png" alt="arrow-right"></button>',
    prevArrow: '<button type="button" class="slick-next"><img src="images/prev-arrow.png" alt="arrow-left"></button>',

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          dots: false,
        }
      }
    ]
  });



  $('.product-main__head-slider').slick({
    dots: false,

    prevArrow: '<button type="button" class="product-main__btn--prev"><img src="images/icons/icon-left.svg" alt="arrow-left"></button>',
    nextArrow: '<button type="button" class="product-main__btn--next"><img src="images/icons/icon-right.svg" alt="arrow-right"></button>',

    responsive: [
      {
        breakpoint: 576,
        settings: {
          arrows: false,
        }
      }
    ]
  });



  $('.interest-slider').slick({
    dots: false,
    slidesToShow: 5,
    nextArrow: '<button type="button" class="slick-left"><img src="images/next-arrow.png" alt="arrow-right"></button>',
    prevArrow: '<button type="button" class="slick-right"><img src="images/prev-arrow.png" alt="arrow-left"></button>',

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow: 2,
          spaceBetween: 5,
        }
      },
      {
        breakpoint: 374,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow: 1,
        }
      },
    ]
  });


  if (window.innerWidth <= 1200) {
    $('.restorant-card').slick({
      dots: true,
      arrows: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 810,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  }

  if (window.innerWidth <= 800) {
    $('.discount__list').slick({
      dots: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
    });
  }


  $('.burger-btn').on('click', function () {
    $('.header__burger-nav').toggleClass('header__burger-nav--active');
    $('body').toggleClass('body--active');
    $('.wrapper').toggleClass('wrapper--active');
  });

  $('.filter-btn').on('click', function () {
    $('.sidebar').addClass('sidebar--active');
  });

  $('.close-btn').on('click', function () {
    $('.sidebar').removeClass('sidebar--active');
  });





  const filterBtns = document.querySelectorAll(".categories-nav__btn");
  const grid = document.querySelector(".categories-list");


  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((filterBtn) => {
        filterBtn.classList.remove("active");
      });
      btn.classList.add("active");
      const filterValue = btn.getAttribute("data-filter");
      for (const item of grid.children) {
        if (filterValue === "all") {
          item.classList.remove('hide');
          item.classList.add('show');
        } else if (item.classList.contains(filterValue)) {
          item.classList.remove('hide')
          item.classList.add('show')
        } else {
          item.classList.remove('show')
          item.classList.add('hide')
        }
      }
    });
  });




  const tabsNav = document.querySelectorAll(".tabs-nav__link");
  const tabsContent = document.querySelectorAll(".tabs-content__item");

  tabsNav.forEach((navLink, index) => {
    navLink.addEventListener("click", () => {
      tabsNav.forEach((link) => {
        link.classList.remove("active");
      });

      navLink.classList.add("active");

      let navIndex = index;

      tabsContent.forEach((item, index) => {
        item.classList.remove("active");

        if (index === navIndex) {
          item.classList.add("active");
        }
      });
    });
  });



  const rateStars = document.querySelector(".feedback-form__stars");
  const rating = new Starry(rateStars, {
    name: `rating`,
    icons: {
      blank: "../images/star-empty.svg",
      hover: "../images/star-fill.svg",
      active: "../images/star-fill.svg",
    },
  });




  const header = document.querySelector('header');

  window.onscroll = () => {
    if (window.pageYOffset > 100) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };


  const staticStars = document.querySelectorAll(".static-stars");

  staticStars.forEach((starItem, index) => {
    let stars = starItem.dataset.stars;

    new Starry(starItem, {
      name: `stars-${index}`,
      readOnly: true,
      beginWith: 20 * stars,
      icons: {
        blank: "../images/star-empty.svg",
        hover: "../images/star-fill.svg",
        active: "../images/star-fill.svg",
      },
    });
  });

  $(document).ready(function () {
    $('.quantity__btn--minus').click(function () {
      var $input = $(this).parent().find('.quantity__input');
      var count = parseInt($input.val()) - 1;
      count = count < 1 ? 1 : count;
      $input.val(count);
      $input.change();
      return false;
    });
    $('.quantity__btn--plus').click(function () {
      var $input = $(this).parent().find('.quantity__input');
      $input.val(parseInt($input.val()) + 1);
      $input.change();
      return false;
    });
  });


  const rangeSlider = document.querySelector('.range__slider');
  const inputMin = document.querySelector('.range__input--min');
  const inputMax = document.querySelector('.range__input--max');

  noUiSlider.create(rangeSlider, {
    start: [100, 1000],
    connect: true,
    padding: [0, 0],
    animate: true,
    step: 10,
    range: {
      'min': 50,
      'max': 1200
    }
  });


  rangeSlider.noUiSlider.on('update', function (values, handle) {
    let value = parseFloat(values[handle]).toFixed(0);
    if (handle) {
      inputMax.value = value;
    } else {
      inputMin.value = value;
    }
  });

  inputMin.addEventListener('change', function () {
    rangeSlider.noUiSlider.set([this.value, null]);
  });

  inputMax.addEventListener('change', function () {
    rangeSlider.noUiSlider.set([null, this.value]);
  });
}); 