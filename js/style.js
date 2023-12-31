const menuBtn = document.querySelector('.menu-js');
const menuIconWrapper = document.querySelector('.menu-icon-wrapper');
const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.header__navigation_wrap');
const overlay = document.querySelector('.overlay');
const navItem = document.querySelectorAll('.nav__item');


// swiper

const swiper1 = new Swiper('.swiper1', {
  // Optional parameters
  loop: true,
  slidesPerView: 1,
  centeredSlides: true,

  // Navigation arrows
  navigation: {
    nextEl: '.quote__btn_next',
    prevEl: '.quote__btn_prev',
  },

});

const swiper2 = new Swiper('.swiper2', {
  // Optional parameters
  loop: true,
  initialSlide: 1,
  spaceBetween: 30,
  slidesPerView: 'auto',
  centeredSlides: true,

  // Navigation arrows
  navigation: {
    nextEl: '.gallery__btn_next',
    prevEl: '.gallery__btn_prev',
  },

});


// scroll  

const scrollController = {
  scrollPosition: 0,
  disabledScroll() {
    scrollController.scrollPosition = window.scrollY
    document.body.style.cssText = `
    overflow: hidden;
    position: fixed;
    top: -${scrollController.scrollPosition}px;
    left: 0;
    height: 100vh;
    width: 100vw;
    padding: ${window.innerWidth - document.body.offsetWidth}px;
    `;
    document.documentElement.style.scrollBehavior = 'unset';
  },
  enabledScroll() {
    document.body.style.cssText = '';
    window.scroll({ top: scrollController.scrollPosition });
    document.documentElement.style.scrollBehavior = '';
  },

}


// mobile menu


const menuOpen = () => {
  menuBtn.addEventListener('click', () => {
    menuIcon.classList.toggle('menu-icon-active');
    menu.classList.toggle('nav-open');
    overlay.classList.toggle('overlay-active');
    document.body.classList.toggle('nav-open-js');
  })
}

navItem.forEach((item) => {
  item.addEventListener('click', () => {
    menuIcon.classList.toggle('menu-icon-active');
    menu.classList.toggle('nav-open');
    overlay.classList.remove('overlay-active');
    document.body.classList.toggle('nav-open-js');
  })
})

const menuClose = () => {
  overlay.addEventListener('click', (event) => {
    const target = event.target;

    if (target === overlay || target === menuBtn) {
      menuIcon.classList.remove('menu-icon-active');
      menu.classList.remove('nav-open');
      overlay.classList.remove('overlay-active');
      scrollController.enabledScroll();
      document.body.classList.toggle('nav-open-js');
    }
  })
}

menuOpen();
menuClose();




const modalController = ({ modal, btnOpen, btnClose, modalSubmit, time = 300 }) => {
  const buttonElems = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);

  modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${time}ms ease-in-out;
  `;

  const closeModal = event => {
    const target = event.target;

    if (
      target === modalElem ||
      (btnClose && target.closest(btnClose)) ||
      (modalSubmit && target.closest(modalSubmit)) ||
      event.code === 'Escape'
    ) {

      modalElem.style.opacity = 0;

      setTimeout(() => {
        modalElem.style.visibility = 'hidden';
        scrollController.enabledScroll();
      }, time);

      window.removeEventListener('keydown', closeModal);
    }
  }

  const openModal = () => {
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = 1;
    window.addEventListener('keydown', closeModal);
    scrollController.disabledScroll();
  };

  buttonElems.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  modalElem.addEventListener('click', closeModal);
};

modalController({
  modal: '.modal',
  btnOpen: '.header__btn',
  btnClose: '.modal__close',
  modalSubmit: '.modal__submit',
});

$(document).ready(function () {
  $("#myForm").on("submit", function (event) {
    event.preventDefault(); // Отменяем стандартное поведение формы
    // Получаем данные из полей формы
    const data = {
      name: $("#name").val(),
      phone: $("#phone").val(),
    };
    // Отправляем данные на сервер с помощью AJAX
    $.ajax({
      url: "/your_server_endpoint", // Здесь указываем URL-адрес серверного обработчика
      type: "post",
      data: data,
      success: function (response) {
        // Обработка успешной отправки данных
        console.log("Данные успешно отправлены!");
      },
      error: function (error) {
        // Обработка ошибок при отправке данных
        alert("Ошибка при отправке данных: ", error);
      },
    });
  });
});