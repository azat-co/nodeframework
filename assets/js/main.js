$(document).ready(function() {
  // Check if `projects.js` was loaded before this file.
  // `projects` is defined in `projects.js`.
  if (typeof projects !== 'undefined') {
    // Loop over each project
    projects.forEach(function (project) {
      if (project.hasOwnProperty('tags')) {
        // Project has tag(s), so add to every list that matches the tag.
        project.tags.forEach(function (tag) {
          addProjectToProjectList(tag, project);
        });
      } else {
        // The project doesn't have any tags, so add it to the "other" section.
        addProjectToProjectList('other', project);
      }
    });
  } else {
    // `projects.js` needs to be loaded before this file
    console.error('Please load `projects.js` before `main.js`!');
  }

  function addProjectToProjectList(tag, project) {
    var element = '';

    element += '<li>';
    element +=   '<i class="icon-check"></i> <a href="' + project.homepage + '">' + project.name + '</a> ';
    if (project.annotation) { element += '(' + project.annotation + ') '; }
    element +=   '<iframe src="http://ghbtns.com/github-btn.html?user=' + project.github.user + '&repo=' + project.github.repo + '&type=watch&count=true" allowtransparency="true" frameborder="0" scrolling="0" width="110" height="20"></iframe>';
    element +=   '<a data-toggle="collapse" data-parent="#mvc" href="#project-link-container_' + project.github.user + '__' + project.github.repo + '">';
    element +=     '<i class="icon-info icon-stack-1x icon-inverse"></i>';
    element +=   '</a>';
    element +=   '<div id="project-link-container_' + project.github.user + '__' + project.github.repo + '" class="panel-collapse collapse">';
    project.links.forEach(function (link) { element += '[<a href="' + link.url + '">' + link.title + '</a>]&nbsp;'; });
    element +=   '</div>';
    element += '</li>';

    return $('#project-list-' + tag).append(element);
  }

  $('[rel=tooltip]').tooltip();

// Add spin.js to lazy load container

$('.lazy-container').spin({ color: '#000'});





// Responsive menu

var navigation = responsiveNav("#nav", {
   insert: "before",
   customToggle: "#toggle",
  open: function () {
    $('#toggle').addClass("btn-highlite");
  },
  close: function () {
    $('#toggle').removeClass("btn-highlite");
  }
});

// Lazy loading.
$("img.lazy").lazyload({
  // The image starts loading 200 px before it is in viewport
   threshold : 200,
   // Remove the line if you don`t need fade effect.
   effect : "fadeIn",
   // Change this for fade in speed
    effectspeed: 600,
   //  Hide spinner when loaded
   load : function(elements_left, settings) {
 $(".lazy-container").has(this).addClass('loaded');
 $(".loaded .spinner").remove();
// refresh bootstrap scrollspy, when image is loaded
 $('[data-spy="scroll"]').each(function () {
  var $spy = $(this).scrollspy('refresh')
});
      }
});


// Lightbox

$('.lightbox').magnificPopup({
  type:'image',
   disableOn: function() {
    // Detect here whether you want to show the popup
    // return true if you want
    if($(window).width() < 500) {
      return false;
    }
    return true; },
     preloader: true,
tLoading: 'Loading',

// Delay in milliseconds before popup is removed
	removalDelay: 300,
  mainClass: 'mfp-fade',
  callbacks: {
    open: function() {
      $('.navbar').fadeOut('slow');
    },
    close: function() {
     $('.navbar').fadeIn('slow');
    }

  }

});

// Lightbox video/maps

$(' .iframe').magnificPopup({
  type:'iframe',
  mainClass: 'mfp-fad',
     disableOn: function() {
    if($(window).width() < 500) {
      return false;
    }
    return true; },
     preloader: true,

 callbacks: {
    open: function() {
      $('.navbar').fadeOut('slow');
    },
    close: function() {
     $('.navbar').fadeIn('slow');
    }
 }
});

// .scroll class for link scrolling.

 $('.scroll[href^="#"]').bind('click.smoothscroll',function (e) {
    e.preventDefault();
    var target = this.hash;
        $target = $(target);
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top
    }, 900, 'swing', function () {
        window.location.hash = target;
      });

});

// .scroll class for link scrolling.

$('.collapse').on('show', function(){
    $(this).parent().find(".icon-plus").removeClass("icon-plus").addClass("icon-minus");
    $(this).parent().find(".accordion-heading").addClass("active");
}).on('hide', function(){
    $(this).parent().find(".icon-minus").removeClass("icon-minus").addClass("icon-plus");
    $(this).parent().find(".accordion-heading").removeClass("active");
});

// Close menu when clicked. Mobile view

$('.nav a').click(function (e) {

        if ($('#toggle').is(":visible"))
          navigation.toggle();
      });

//  Remove logo from menu. when mobile view
var jRes = jRespond([
    {
        label: 'mobile',
        enter: 0,
        exit: 768
    }
]);

jRes.addFunc({
    breakpoint: 'mobile',
    enter: function() {
    $('h1').fadeOut('slow');
    },
    exit: function() {
  $('h1').fadeIn('slow');
    }
});
});


//  Static menu for IOS >5 . As fixed position is not supported.

function iOSversion() {
  if (/iP(hone|od|ad)/.test(navigator.platform)) {
    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
  }

  else {
    return  "0"
  }
}

ver = iOSversion();

if (ver[0] >= 5) {
  $('.navbar-fixed-top').addClass('iphone');
   $('.btn-nav').addClass('iphone');
}
