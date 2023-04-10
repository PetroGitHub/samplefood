$(function () {

  const header = document.querySelector('header');

  window.onscroll = () => {
    if (window.pageYOffset > 100) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };

  $('.product-main__head-slider').slick({
    dots: false,
    //dots: true,

    prevArrow: '<button type="button" class="product-main__btn--prev"><img src="images/icons/icon-left.svg" alt="arrow-left"></button>',
    nextArrow: '<button type="button" class="product-main__btn--next"><img src="images/icons/icon-right.svg" alt="arrow-right"></button>',
  });

  $('.review-slider__content').slick({
    dots: true,
    nextArrow: '<button type="button" class="slick-prev"><img src="images/next-arrow.png" alt="arrow-right"></button>',
    prevArrow: '<button type="button" class="slick-next"><img src="images/prev-arrow.png" alt="arrow-left"></button>',

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          dots: false
        }
      }
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


  const rangeSlider = document.querySelector('.range__slider');
  const inputMin = document.querySelector('.range__input--min');
  const inputMax = document.querySelector('.range__input--max');

  noUiSlider.create(rangeSlider, {
    start: [100, 1000],
    connect: true,
    padding: [0, 0],
    animate: true,
    // cssPrefix: 'noUi-',
    step: 10,
    range: {
      'min': 50,
      'max': 1200
    }

  });



  rangeSlider.noUiSlider.on('update', function (values, handle) {
    // let value = values[handle];
    let value = parseFloat(values[handle]).toFixed(0);
    if (handle) {
      inputMax.value = value;
    } else {
      inputMin.value = value;
    }
  });


  // Оновлення значень слайдера при зміні input-ів
  inputMin.addEventListener('change', function () {
    rangeSlider.noUiSlider.set([this.value, null]);
  });

  inputMax.addEventListener('change', function () {
    rangeSlider.noUiSlider.set([null, this.value]);
  });



  const filterBtns = document.querySelectorAll(".categories-nav__btn");
  const grid = document.querySelector(".categories-list");


  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // remove active class from all buttons
      filterBtns.forEach((filterBtn) => {
        filterBtn.classList.remove("active");
      });
      // add active class to clicked button
      btn.classList.add("active");

      // get the filter value from the clicked button
      const filterValue = btn.getAttribute("data-filter");

      // filter the grid items based on the filter value
      for (const item of grid.children) {
        if (filterValue === "all") {
          // item.style.display = "block";
          item.classList.remove('hide');
          item.classList.add('show');
        } else if (item.classList.contains(filterValue)) {
          // item.style.display = "block";
          item.classList.remove('hide')
          item.classList.add('show')
        } else {
          // item.style.display = "none";
          item.classList.remove('show')
          item.classList.add('hide')
        }
      }
    });
  });
}); 