const USED_CARS = 'filter-used'; 
const NEW_CARS = 'filter-new';
const url_path = 'https://orcseven.com/api/orcv2/viewController'; //'//localhost:8081/orcv2/viewController';
let orcsettings = null;
$.ajaxSetup({
  beforeSend: function (xhr) {
    if (orcsettings) {                
      xhr.setRequestHeader('severContext', orcsettings.server.context)    
    }
  }
});

$.get(url_path, function (rsp){
  orcsettings = rsp;
  return true;                        
}).fail(function(e){
  alert('não foi possivel resolver o pedido, por favor tente mais tarde. Obrigado.');
  return false;
});

function fillPortfolio (responseData) {
  let status = null;
  const portfolioContainer = $('.portfolio-container');

  responseData.data.forEach((pub)=>{
    debugger;
    if (pub.published) {
        status = (pub.pubCondStatus === 'condUsed' ? USED_CARS : NEW_CARS);
        $('<div>', {class:'col-lg-4 col-md-6 portfolio-item wow fadeInUp ' + status}).append(
        $('<div>', {class:'portfolio-wrap'}).append(
        $('<figure>', {class:'portfolio-figure'}).append(
        $('<img>', {class:'img-fluid', alt: '', src: pub.pubGalery[0].base64}),
        $('<a>', {class:'link-preview', 'data-lightbox': 'portfolio', 'data-title':pub.pubName, title:pub.pubName, href:'#'}).append(
        $('<i>', {class:'ion ion-eye'})
        ),
        $('<a>', {class:'link-details', title:'More Details', href:'#'}).append(
        $('<i>', {class:'ion ion-android-open'})
        )
        ),
        $('<div>', {class: 'portfolio-info'}).append(
        $('<h4>').append(
        $('<a>', {href:'#'}).text(pub.pubName)
        ),
        $('<p>').text('Ano: ' + pub.pubAnoRegisto)
        )
        )
        ).appendTo(portfolioContainer);
    }
  });
} 

function BackToTopButton($j) {
  // Back to top button
  $j(window).scroll(function () {
    if ($j(this).scrollTop() > 100) {
      $j('.back-to-top').fadeIn('slow');
    } else {
      $j('.back-to-top').fadeOut('slow');
    }
  });
  $j('.back-to-top').click(function () {
    $j('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
  });
}

jQuery(document).ready(function ($) {

  // Back to top button
    BackToTopButton($); 

  // Initiate the wowjs animation library
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header-fixed')) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Header scroll class
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  // Intro carousel
  var introCarousel = $(".carousel");
  var introCarouselIndicators = $(".carousel-indicators");
  introCarousel.find(".carousel-inner").children(".carousel-item").each(function (index) {
    (index === 0) ?
      introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "' class='active'></li>") :
      introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "'></li>");
  });

  $(".carousel").swipe({
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
      if (direction == 'left') $(this).carousel('next');
      if (direction == 'right') $(this).carousel('prev');
    },
    allowPageScroll: "vertical"
  });

  // Skills section
  $('#skills').waypoint(function () {
    $('.progress .progress-bar').each(function () {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, { offset: '80%' });

  // jQuery counterUp (used in Facts section)
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });
  
  readAll();

  // Clients carousel (uses the Owl Carousel library)
  $(".clients-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: { items: 2 }, 768: { items: 4 }, 900: { items: 6 }
    }
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

});

function serviceParams () {
  return {
      REQ_CONTEX : 155015, 
      REQ_ACTION : 1,
      REQ_INPUTS: {origin:'w2ui'}
  };
} 

async function service (type, data, callb) {
  /**orcsettings.server.serverUrlApi */
  return $.ajax(orcsettings.server.local_server_path,{
      type: type,
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify(data), 
      success: callb,
      error: function(XMLHttpRequest, textStatus, errorThrown) {
          alert(String(XMLHttpRequest.responseText));
      }
  });
}

async function post (data, callb) {
  return await service('POST', data, callb)
}

function readAll () {
  let data = serviceParams();
  data.REQ_ACTION = 100600;
  data.REQ_INPUTS['SUBACTION'] = 'readAll';
  data.REQ_INPUTS['SUBVALUE'] = true;
  post(data, (data) => {
      try {
          if (data.status === 'success') {
              if (data.dataresponse && data.dataresponse.status === 200) {
                  if (data.dataresponse.output && data.dataresponse.output.iook) {
                    fillPortfolio(data.dataresponse.output); 
                    // Porfolio isotope and filter
                    var portfolioIsotope = $('.portfolio-container').isotope({
                      itemSelector: '.portfolio-item',
                      layoutMode: 'fitRows'
                    });

                    $('#portfolio-flters li').on('click', function () {
                      $("#portfolio-flters li").removeClass('filter-active');
                      $(this).addClass('filter-active');
                      portfolioIsotope.isotope({ filter: $(this).data('filter') });
                    });
                  }
              } else {
                  let msg = data.dataresponse.message; 
                  if (!msg && data.dataresponse.output) {
                      msg = data.dataresponse.output.error;
                  } else {
                      msg = 'error desconhecido'
                  }
                  throw(msg);
              }
          } else {
              throw(data.message);
          }
      } catch (error) {
          alert(error)
      }
  });
  }