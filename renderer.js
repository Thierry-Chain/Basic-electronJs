let data = [
  {
    qt: 'Good judgment comes from experience, and a lot of that comes from bad judgment.',
    src: 'will rogers',
  },
  {
    qt: 'Think in the morning. Act in the noon. Eat in the evening. Sleep in the night.',
    src: 'William Blake',
  },
  ,
  {
    qt: " Work like you don't need the money. Love like you've never been hurt. Dance like nobody's watching. ",
    src: 'Satchel Paige',
  },
  {
    qt: 'If you cannot do great things, do small things in a great way.',
    src: 'Napolean Hill',
  },
  {
    qt: 'The supreme art of war is to subdue the enemy without fighting.',
    src: 'Sun Tzu',
  },
  {
    qt: 'Keep your face always toward the sunshine - and shadows will fall behind you.',
    src: 'Walt whitman',
  },
  ,
  {
    qt: "There is only one corner of the universe you can be certain of improving, and that's your own self.",
    src: 'Aldous Houxley',
  },
  ,
  {
    qt: 'There is nothing on this earth more to be prized than true friendship.',
    src: 'Thomas Acqinus',
  },
]
let randomize = () => {
  return Math.floor(Math.random() * 8)
}
setInterval(() => {
  let dt = data[randomize()]
  document.getElementById('quote').innerText = dt.qt
  document.getElementById('source').innerText = dt.src
}, 4800)
