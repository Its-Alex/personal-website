particlesJS.load('particles-js', 'asset/particles.json');

var vm = new Vue({
  el: '#particles-js',
  beforeCreate: function () {
    axios.get('https://api.github.com/users/its-alex/repos', {})
    .then((res) => {
      var tmp = JSON.parse(res.request.response);

      for (var count=0; count < tmp.length; count++){
        this.repos[count].name = tmp[count].name;
        this.repos[count].link = tmp[count].url;
        this.repos[count].description = tmp[count].description;
      }
    })
    .catch((err) => {
      console.log(err);
    })
  },
  data: {
    repos: [{
        text: `CV`,
        link: `https://github.com/its-alex/CV`,
        description: `Salut!`
    }]
  }
});
