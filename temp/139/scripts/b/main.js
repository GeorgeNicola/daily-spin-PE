"use strict";

// var dataRich = pf.web.rich.data.userdata;

// $(document).ready(function () {
//   document.getElementById("inner-container").insertAdjacentHTML('afterbegin', "<p style='font-size: 0.5rem; color: black; font-weight: bold'>" + JSON.stringify(dataRich) + "</p>");
//   });

var IE7 = navigator.appVersion.indexOf("MSIE 7.") > -1,
    IE8 = navigator.appVersion.indexOf("MSIE 8.") > -1;

var dataRich = pf.web.rich.data.userdata;
var validCampigns = dataRich.marketingcampaigndata.marketingcampaigns === null;
var richConfig = {
  userFTD: dataRich.accountdetails.isftd,
  userLang: dataRich.applicationcontext.language.toLowerCase(),
  utcdate: dataRich.applicationcontext.serverdatetime || '',
  userCountry: dataRich.applicationcontext.currentipcountry.toLowerCase(),
  deviceType: dataRich.applicationcontext.deviceinformation.additionalinfo.typename,
  firstName: dataRich.accountdetails.firstname,
  brandID: dataRich.accountdetails.brandid,
  marketingcampaignid: validCampigns ? '' : dataRich.marketingcampaigndata.marketingcampaigns[0].marketingcampaignid,
  marketingCampaignsArray: validCampigns ? '' : dataRich.marketingcampaigndata.marketingcampaigns[0].campaigns,
  openURL: function openURL(getUrl) {
    window.external.CallToAction('{"ActionId":"27","url":"' + getUrl + '"}');
  },
  closePage: function closePage() {
    if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)) {
      window.external.CallToAction('{"ActionId":"CloseMe"}');
    } else {
      window.external.CallToAction('{"ActionId":"0"}');
    }
  },
  playNow: function playNow() {
    window.external.CallToAction('{"ActionId": "39"}');
  },
  depositNow: function depositNow() {
    window.external.CallToAction('{"ActionId": "6", "TabId": "8"}');
  },
  claimPrize: function claimPrize(claimidentifier, prizeName) {
    if (typeof buildRForLocal !== "undefined") {
      // this parameter exist in the Mockdata folder only for local
      if (prizesObj1[richConfig.brandID][spinConfig.GetPrizeDescription()].slice == 8) {
        setTimeout(function () {
          $('#game-board').addClass('no-win');
          $('#no-win').removeClass('invisible');
        }, 1000);
      } else setTimeout(function () {
        $('#game-board').addClass('congrats');
      }, 1000);
    } else {
      try {
        pf.web.rich.actions.claimbonus(claimidentifier, function (status) {
          console.log(status);
          pf.web.rich.tracking.trackevent('claim_prize_name', {
            'prizename': prizeName
          });
          setTimeout(function () {
            $('#game-board').addClass('congrats');
          }, 1000);
        }, function () {
          console.log('error');
          spinConfig.openTechIssuePopup('23', 'error 23 - claim bonus call back error');
        });
      } catch (error) {
        spinConfig.openTechIssuePopup('24', 'error 24 - pf action undefined');
      }
    }
  },
  setCookie: function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  },
  getCookie: function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },
  returnValidGuidArray: function returnValidGuidArray(campaign) {
    // console.log(campaign);
    var validGuidList = [];
    campaign.forEach(function (element) {
      // console.log(element);
      element.scheduledrules.forEach(function (element) {
        //console.log('scheduledrules',element);
        if (element.rulecompletions != null) {
          element.rulecompletions.forEach(function (element) {
            //console.log('rulecompletions',element);
            if (element.completionactions != null) {
              element.completionactions.forEach(function (element) {
                //console.log('completionactions',element);
                if (element.offers != null) {
                  element.offers.forEach(function (element) {
                    // console.log('lest', element.claimidentifier);
                    if (element.claimbonusstatus === 5 && element.claimidentifier !== null) {
                      // console.log(element);
                      validGuidList.push(element);
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
    return validGuidList;
  },

  returnFTDStatus: function returnFTDStatus() {
    if (richConfig.userFTD === true) {
      return "1";
    } else {
      return "0";
    }
  }
};

var spinConfig = {
  wheelOfFortune: $("#wheel-of-fortune"),
  spear: $("#spear"),
  spinBtn: $("#spin-btn"),
  wheelAngle: 0,
  validGuidArray: validCampigns ? '' : richConfig.returnValidGuidArray(dataRich.marketingcampaigndata.marketingcampaigns[0].campaigns),
  brandLinks: countryConfig[richConfig.brandID],
  langArray: ['fr', 'es', 'pt', 'ru', 'de'],
  contactLink: 'https://888-external-en.custhelp.com/app/ask/p/4',
  openPopup: function openPopup(selectedPopup, popupDescription) {
    spinConfig.RemoveSpinner();
    $('.game-message').css('visibility', 'hidden');
    $(selectedPopup).css('visibility', 'visible').hide().delay(1000).fadeIn(500);
    if (typeof popupDescription !== 'undefined' && typeof pf.web.rich.tracking === "function") {
      pf.web.rich.tracking.trackevent('popup_event', {
        'popup': popupDescription
      });
    }
  },
  openTechIssuePopup: function openTechIssuePopup(errorNum, errorDescription) {
    $('.error-num').text(errorNum);
    if (typeof errorDescription !== 'undefined' && typeof pf.web.rich.tracking === "function") {
      pf.web.rich.tracking.trackevent('error_event', { 'errorid': errorDescription });
    }
  },
  RemoveSpinner: function RemoveSpinner() {
    $('.loader').fadeOut(500);
  },
  win: function win() {
    richConfig.claimPrize(spinConfig.validGuidArray[0].claimidentifier, spinConfig.validGuidArray[0].packagename.trim());
  },

  /* Get the prize the player should win, rotate the wheel to the correct prize, rotate the spear */
  RotateWheel: function RotateWheel() {
    this.wheelOfFortune = $("#wheel-of-fortune");
    this.wheelOfFortune.add(this.spinBtn).unbind("click");
    $('#loding-spin-btn').fadeIn();
    createDailySpin();
  },

  /* Get prize position based on its index in the prizes array */
  GetPrizeDescription: function GetPrizeDescription() {
    var prize = Object.keys(prizesObj1[richConfig.brandID]);
    for (var i = 0, len = prize.length; i < len; i++) {
      var val = prize[i];
      if (val == spinConfig.validGuidArray[0].packagename.trim()) {
        return val;
      }
    }
  },

  PopupFadeIn: function PopupFadeIn(tabClass) {
    $(tabClass).removeClass('invisible');
    var popup = $('#popup-con');
    popup.hide().removeClass('invisible').fadeIn(500);
  },
  setSpinImages: function setSpinImages() {
    // Create images path for scratch and prize images
    var lengForCom = richConfig.brandID === 1 ? spinConfig.langArray.includes(richConfig.userLang) ? richConfig.userLang + '-' : 'en-' : ''; //Set correct leng for COM site
    var brandFolder = spinConfig.brandLinks.lang;

    if (typeof buildRForLocal !== "undefined") {
      // this parameter exist in the Mockdata folder only for local
      return { // for local game
        main: 'images/' + brandFolder + '/' + lengForCom + 'spin.png',
        title: 'images/' + brandFolder + '/' + lengForCom + 'title.png'
      };
    } else {
      return { // when you upload to server need to change "localfile" to false
        main: 'Campaigns/' + richConfig.marketingcampaignid + '/images/' + brandFolder + '/' + lengForCom + 'spin.png',
        title: 'Campaigns/' + richConfig.marketingcampaignid + '/images/' + brandFolder + '/' + lengForCom + 'title.png'
      };
    }
  }
};

$(document).ready(function () {
  (function (k) {
    for (var Wilq32, IE, d, f, l = document.getElementsByTagName("head")[0].style, h = ["transformProperty", "WebkitTransform", "OTransform", "msTransform", "MozTransform"], g = 0; g < h.length; g++) {
      void 0 !== l[h[g]] && (d = h[g]);
    }d && (f = d.replace(/[tT]ransform/, "TransformOrigin"), "T" == f[0] && (f[0] = "t"));eval('IE = "v"=="\v"');jQuery.fn.extend({ rotate: function rotate(a) {
        if (0 !== this.length && "undefined" != typeof a) {
          "number" == typeof a && (a = { angle: a });for (var b = [], c = 0, d = this.length; c < d; c++) {
            var e = this.get(c);if (e.Wilq32 && e.Wilq32.PhotoEffect) e.Wilq32.PhotoEffect._handleRotation(a);else {
              var f = k.extend(!0, {}, a),
                  e = new Wilq32.PhotoEffect(e, f)._rootObj;b.push(k(e));
            }
          }return b;
        }
      }, getRotateAngle: function getRotateAngle() {
        for (var a = [], b = 0, c = this.length; b < c; b++) {
          var d = this.get(b);d.Wilq32 && d.Wilq32.PhotoEffect && (a[b] = d.Wilq32.PhotoEffect._angle);
        }return a;
      }, stopRotate: function stopRotate() {
        for (var a = 0, b = this.length; a < b; a++) {
          var c = this.get(a);c.Wilq32 && c.Wilq32.PhotoEffect && clearTimeout(c.Wilq32.PhotoEffect._timer);
        }
      } });Wilq32 = window.Wilq32 || {};Wilq32.PhotoEffect = function () {
      return d ? function (a, b) {
        a.Wilq32 = { PhotoEffect: this };
        this._img = this._rootObj = this._eventObj = a;this._handleRotation(b);
      } : function (a, b) {
        this._img = a;this._onLoadDelegate = [b];this._rootObj = document.createElement("span");this._rootObj.style.display = "inline-block";this._rootObj.Wilq32 = { PhotoEffect: this };a.parentNode.insertBefore(this._rootObj, a);if (a.complete) this._Loader();else {
          var c = this;jQuery(this._img).bind("load", function () {
            c._Loader();
          });
        }
      };
    }();Wilq32.PhotoEffect.prototype = { _setupParameters: function _setupParameters(a) {
        this._parameters = this._parameters || {};"number" !== typeof this._angle && (this._angle = 0);"number" === typeof a.angle && (this._angle = a.angle);this._parameters.animateTo = "number" === typeof a.animateTo ? a.animateTo : this._angle;this._parameters.step = a.step || this._parameters.step || null;this._parameters.easing = a.easing || this._parameters.easing || this._defaultEasing;this._parameters.duration = a.duration || this._parameters.duration || 1E3;this._parameters.callback = a.callback || this._parameters.callback || this._emptyFunction;this._parameters.center = a.center || this._parameters.center || ["50%", "50%"];this._rotationCenterX = "string" == typeof this._parameters.center[0] ? parseInt(this._parameters.center[0], 10) / 100 * this._imgWidth * this._aspectW : this._parameters.center[0];this._rotationCenterY = "string" == typeof this._parameters.center[1] ? parseInt(this._parameters.center[1], 10) / 100 * this._imgHeight * this._aspectH : this._parameters.center[1];a.bind && a.bind != this._parameters.bind && this._BindEvents(a.bind);
      }, _emptyFunction: function _emptyFunction() {}, _defaultEasing: function _defaultEasing(a, b, c, d, e) {
        return -d * ((b = b / e - 1) * b * b * b - 1) + c;
      }, _handleRotation: function _handleRotation(a, b) {
        d || this._img.complete || b ? (this._setupParameters(a), this._angle == this._parameters.animateTo ? this._rotate(this._angle) : this._animateStart()) : this._onLoadDelegate.push(a);
      }, _BindEvents: function _BindEvents(a) {
        if (a && this._eventObj) {
          if (this._parameters.bind) {
            var b = this._parameters.bind,
                c;for (c in b) {
              b.hasOwnProperty(c) && jQuery(this._eventObj).unbind(c, b[c]);
            }
          }this._parameters.bind = a;for (c in a) {
            a.hasOwnProperty(c) && jQuery(this._eventObj).bind(c, a[c]);
          }
        }
      }, _Loader: function () {
        return IE ? function () {
          var a = this._img.width,
              b = this._img.height;this._imgWidth = a;this._imgHeight = b;this._img.parentNode.removeChild(this._img);this._vimage = this.createVMLNode("image");this._vimage.src = this._img.src;this._vimage.style.height = b + "px";this._vimage.style.width = a + "px";this._vimage.style.position = "absolute";this._vimage.style.top = "0px";this._vimage.style.left = "0px";this._aspectW = this._aspectH = 1;this._container = this.createVMLNode("group");this._container.style.width = a;this._container.style.height = b;this._container.style.position = "absolute";this._container.style.top = "0px";this._container.style.left = "0px";this._container.setAttribute("coordsize", a - 1 + "," + (b - 1));this._container.appendChild(this._vimage);this._rootObj.appendChild(this._container);this._rootObj.style.position = "relative";this._rootObj.style.width = a + "px";this._rootObj.style.height = b + "px";this._rootObj.setAttribute("id", this._img.getAttribute("id"));this._rootObj.className = this._img.className;for (this._eventObj = this._rootObj; a = this._onLoadDelegate.shift();) {
            this._handleRotation(a, !0);
          }
        } : function () {
          this._rootObj.setAttribute("id", this._img.getAttribute("id"));this._rootObj.className = this._img.className;this._imgWidth = this._img.naturalWidth;this._imgHeight = this._img.naturalHeight;var a = Math.sqrt(this._imgHeight * this._imgHeight + this._imgWidth * this._imgWidth);this._width = 3 * a;this._height = 3 * a;this._aspectW = this._img.offsetWidth / this._img.naturalWidth;this._aspectH = this._img.offsetHeight / this._img.naturalHeight;this._img.parentNode.removeChild(this._img);this._canvas = document.createElement("canvas");
          this._canvas.setAttribute("width", this._width);this._canvas.style.position = "relative";this._canvas.style.left = -this._img.height * this._aspectW + "px";this._canvas.style.top = -this._img.width * this._aspectH + "px";this._canvas.Wilq32 = this._rootObj.Wilq32;this._rootObj.appendChild(this._canvas);this._rootObj.style.width = this._img.width * this._aspectW + "px";this._rootObj.style.height = this._img.height * this._aspectH + "px";this._eventObj = this._canvas;for (this._cnv = this._canvas.getContext("2d"); a = this._onLoadDelegate.shift();) {
            this._handleRotation(a, !0);
          }
        };
      }(), _animateStart: function _animateStart() {
        this._timer && clearTimeout(this._timer);this._animateStartTime = +new Date();this._animateStartAngle = this._angle;this._animate();
      }, _animate: function _animate() {
        var a = +new Date(),
            b = a - this._animateStartTime > this._parameters.duration;if (b && !this._parameters.animatedGif) clearTimeout(this._timer);else {
          if (this._canvas || this._vimage || this._img) a = this._parameters.easing(0, a - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration), this._rotate(~~(10 * a) / 10);this._parameters.step && this._parameters.step(this._angle);var c = this;this._timer = setTimeout(function () {
            c._animate.call(c);
          }, 10);
        }this._parameters.callback && b && (this._angle = this._parameters.animateTo, this._rotate(this._angle), this._parameters.callback.call(this._rootObj));
      }, _rotate: function () {
        var a = Math.PI / 180;return IE ? function (a) {
          this._angle = a;this._container.style.rotation = a % 360 + "deg";this._vimage.style.top = -(this._rotationCenterY - this._imgHeight / 2) + "px";this._vimage.style.left = -(this._rotationCenterX - this._imgWidth / 2) + "px";this._container.style.top = this._rotationCenterY - this._imgHeight / 2 + "px";this._container.style.left = this._rotationCenterX - this._imgWidth / 2 + "px";
        } : d ? function (a) {
          this._angle = a;this._img.style[d] = "rotate(" + a % 360 + "deg)";this._img.style[f] = this._parameters.center.join(" ");
        } : function (b) {
          this._angle = b;b = b % 360 * a;this._canvas.width = this._width;this._canvas.height = this._height;this._cnv.translate(this._imgWidth * this._aspectW, this._imgHeight * this._aspectH);this._cnv.translate(this._rotationCenterX, this._rotationCenterY);this._cnv.rotate(b);this._cnv.translate(-this._rotationCenterX, -this._rotationCenterY);this._cnv.scale(this._aspectW, this._aspectH);this._cnv.drawImage(this._img, 0, 0);
        };
      }() };IE && (Wilq32.PhotoEffect.prototype.createVMLNode = function () {
      document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");try {
        return !document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), function (a) {
          return document.createElement("<rvml:" + a + ' class="rvml">');
        };
      } catch (a) {
        return function (a) {
          return document.createElement("<" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
        };
      }
    }());
  })(jQuery);
});

function createDailySpin() {
  var prizesLength = 9; //add number of slices
  var sliceAngle = 360 / prizesLength;
  $('.spin-cta').fadeOut();

  var tempPrize = prizesObj1[richConfig.brandID][spinConfig.GetPrizeDescription()].slice,
      popupDiv = prizesObj1[richConfig.brandID][spinConfig.GetPrizeDescription()].congratsMsg,
      wheelAngle = (prizesLength + tempPrize) * sliceAngle + 360 * 3;

  if (!$(popupDiv).length) {
    popupDiv += '-ftd1';
  };

  var travelAngle = wheelAngle - spinConfig.wheelOfFortune.getRotateAngle(),
      rotationDuration = 7000,
      spearRotationDuration = rotationDuration / travelAngle * 20,
      lastSlice = Math.floor((spinConfig.wheelOfFortune.getRotateAngle()[0] - sliceAngle / 2 + 1) / sliceAngle);

  var prizeName = $('.prize-name');
  prizeName.text(prizesObj1[richConfig.brandID][spinConfig.GetPrizeDescription()].name[richConfig.userLang]);

  spinConfig.wheelOfFortune.rotate({
    duration: rotationDuration,
    animateTo: wheelAngle,
    easing: function easing(x, t, b, c, d) {
      var currentSlice = Math.floor((spinConfig.wheelOfFortune.getRotateAngle()[0] - sliceAngle / 2 + 1) / sliceAngle),
          ts = (t /= d) * t,
          tc = ts * t;

      if (lastSlice != currentSlice) {
        spinConfig.spear.rotate({
          duration: spearRotationDuration,
          center: ["100%", "50%"],
          animateTo: -30,
          callback: function callback() {
            spinConfig.spear.rotate({
              duration: spearRotationDuration,
              center: ["100%", "50%"],
              animateTo: 0
            });
          }
        });
        lastSlice = currentSlice;
      }
      return b + c * (0.397499999999997 * tc * ts + -2.1925 * ts * ts + 4.295 * tc + -4.6 * ts + 3.1 * t);
    },
    callback: function callback() {
      $('#shadow').fadeIn(500, function () {
        setTimeout(function () {
          spinConfig.PopupFadeIn(popupDiv);
          spinConfig.win();
        }, 2000);
      });
    }
  });
}

function setClickEvents() {
  $('.more-info-link').click(function () {
    richConfig.openURL(spinConfig.brandLinks.moreInfo + '?lang=' + richConfig.userLang);
  });
  $('.tnc-link').click(function () {
    richConfig.openURL(spinConfig.brandLinks.tncLink + '?lang=' + richConfig.userLang);
  });
  $('.contact-link').click(function () {
    richConfig.openURL(spinConfig.contactLink);
  });
  $('.deposit-now-btn').click(richConfig.depositNow);
  $('.play-now-btn').click(richConfig.playNow);
  $('.go-back-btn').click(richConfig.closePage);
}

$(document).ready(function () {

  var editCountry = richConfig.userCountry === '***' && richConfig.userLang === 'www' ? 'gbr' : richConfig.userCountry;
  $('#container').addClass(editCountry + ' ' + richConfig.userLang);
  setClickEvents();
  $('.open-arrow').click(function () {
    $('#tnc').toggleClass("close");
    $('#tnc').css("font-size", "11px");
  });
  $('.open-arrow').click(function () {
    $('#tnc').css("font-size", "11px");
    $('#tnc').css("-webkit-text-size-adjust", "100%");
  });
  var prizesLength = 9; //add number of slices
  var sliceAngle = 360 / prizesLength;
  var prizesObjArray = Object.keys(prizesObj1[richConfig.brandID]);
  if (!(IE7 || IE8)) {
    if (!validCampigns) {
      /* Check if the player can play today or not, if the player can play, remove the spinner and set the click event on the Wheel  */
      if (spinConfig.validGuidArray.length > 0) {
        var wheelImages = spinConfig.setSpinImages(spinConfig.validGuidArray[0].packagename.trim());
        $('#wheel-of-fortune').attr('src', wheelImages.main);
        $('#promo-title').attr('src', wheelImages.title);
        $("#spin-btn").text(spinConfig.brandLinks.cta[richConfig.userLang]);
        spinConfig.wheelOfFortune = $("#wheel-of-fortune");
        if (prizesObjArray.includes(spinConfig.validGuidArray[0].packagename.trim())) /* Can play */{
            var currentPrize = 0;
            spinConfig.wheelAngle += currentPrize * sliceAngle;
            $("#wheel-of-fortune").rotate({
              angle: 0 //wheelAngle
            });

            spinConfig.wheelOfFortune.add(spinConfig.spinBtn).click(spinConfig.RotateWheel);

            spinConfig.RemoveSpinner();
            $('#game-board').hide().removeClass('hidden-game-board').fadeIn(500);
          } else /* tech-issue */{
            $('#tech-issue').removeClass('invisible');
            spinConfig.RemoveSpinner();
            spinConfig.PopupFadeIn('#tech-issue');
          }
      } else /* Already played */{
          $('#already-played').removeClass('invisible');
          spinConfig.RemoveSpinner();
          spinConfig.PopupFadeIn('#already-played-ftd' + richConfig.returnFTDStatus());
        }
    } else {
      $('#not-recognized').removeClass('invisible');
      spinConfig.RemoveSpinner();
      spinConfig.PopupFadeIn('#not-recognized');
    }
  } else {
    $('#not-supported').removeClass('invisible');
    spinConfig.RemoveSpinner();
    spinConfig.PopupFadeIn('#not-supported');
  }
});