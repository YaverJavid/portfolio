"use strict";
var toast = document.getElementsByClassName('toast')[0];
var toastMessage = toast.children[0];
var timeout = null;
// toast
function sendToastMessage(message, time = 3000) {
  if (timeout) clearInterval(timeout)
  toast.classList.add('show-toast')
  toastMessage.textContent = message
  timeout = setTimeout(() => {
    toast.classList.remove('show-toast')
  }, time)
}

sendToastMessage("You Are At Navigator")


// Settings handler
var isSettingOpen = false;
var animationTypes = ['width', 'height'];
var animationType = 'width';
document.getElementsByClassName('toggle-setting-button')[0].addEventListener('click', function() {
  if (!isSettingOpen) animationType = animationTypes[Math.round(Math.random())]
  if (isSettingOpen) this.parentNode.style[animationType] = '10vw'
  else this.parentNode.style[animationType] = '45vw'
  isSettingOpen = !isSettingOpen
})

// Background Changes Handler
var backgroundPaths = ['images/jungle_background.jpg', 'images/background.png', 'images/background_3.png']
backgroundPaths.push(getComputedStyle(menu).getPropertyValue('background-image').substring(5, getComputedStyle(menu).getPropertyValue('background-image').length - 2))
var imageIndex = 1
document.getElementsByClassName('switch-background-button')[0].addEventListener('click', () => changeBackground(++imageIndex))

function changeBackground(imageIndex) {
  imageIndex = Math.abs(imageIndex % backgroundPaths.length)
  menu.style.backgroundImage = `url("${backgroundPaths[imageIndex]}")`
  sendToastMessage("Changed Background")
}

// Audio Handler
var isAudioOn = false
var song = new Audio('audio/jungle.wav')
song.loop = true
var disc = document.getElementsByClassName('disc')[0]
var audioButton = document.getElementsByClassName('toggle-audio-button')[0]
audioButton.addEventListener('click', toggleSettings)
disc.addEventListener('click', toggleSettings)

function toggleSettings() {
  if (isAudioOn) {
    audioButton.src = 'svgs/mmute.svg'
    sendToastMessage('Stopped song')
    song.pause()
  }
  else {
    audioButton.src = 'svgs/mspeaker_on.svg'
    song.currentTime = 0
    song.play()
    sendToastMessage('Playing song')
  }
  disc.classList.toggle('disc-playing')
  isAudioOn = !isAudioOn
}


// Scroll

var firstTouch = { x: undefined, y: undefined }
var lastTouch = { x: undefined, y: undefined }
const th = 75;

menu.addEventListener('touchstart', (e) => {
  firstTouch.x = e.touches[0].clientX
  firstTouch.y = e.touches[0].clientY
})

menu.addEventListener('touchmove', e => {
  lastTouch.x = e.touches[0].clientX
  lastTouch.y = e.touches[0].clientY
})

menu.addEventListener('touchend', (e) => {
  let dy = firstTouch.y - lastTouch.y
  if (dy < 0 && Math.abs(dy) > th) {
    paintPage(--pageIndex)
  } else if (dy > 0 && dy > th) {
    paintPage(++pageIndex)
  }

  let dx = firstTouch.x - lastTouch.x
  if (dx < 0 && Math.abs(dx) > th) {
    changeBackground(++imageIndex)
  } else if (dx > 0 && dx > th) {
    changeBackground(--imageIndex)
  }

})


// menu page

var dotbox = document.getElementById("dot-box")
var menuButtons = document.getElementsByClassName('menu-button')
var dots = document.getElementsByClassName("dot")
var pageIndex = 0
class MenuButton {
  constructor(title = '{{title}}', link = '#') {
    this.title = title,
    this.link = link
  }
}

var pages = [[
    new MenuButton('Home', 'https://yaverjavid.eu/home'),
    new MenuButton('Help'),
    new MenuButton('Contact Us'),
    new MenuButton('Notes App', 'https://yaverjavid.github.io/notes/'),
    new MenuButton('Credits', 'credits(webapp)/index.html')
  ], [
    new MenuButton('Dino'),
    new MenuButton('II Home'),
    new MenuButton('Project Usl'),
    new MenuButton('Synops'),
    new MenuButton('RadiiDraw'),
  ]]

function paintPage(page) {
  page = Math.abs(page % pages.length)
  selectDot(page)
  for (let i = 0; i < menuButtons.length; i++) {
    menuButtons[i].children[0].textContent = pages[page][i].title
    menuButtons[i].children[0].href = pages[page][i].link
  }
}

function selectDot(page) {
  deselectAllDots()
  dots[page].classList.add('selected-dot')
}

function deselectAllDots() {
  for (let i = 0; i < dots.length; i++) {
    if (Object.values(dots[i].classList).includes("selected-dot")) dots[i].classList.remove("selected-dot")
  }
}


dotbox.innerHTML += '<div class="dot"></div>'.repeat(pages.length)

paintPage(pageIndex)
for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener('click', function() {
    paintPage(i)
    pageIndex = i
  })
}
