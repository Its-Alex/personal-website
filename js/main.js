particlesJS.load('particles-js', 'asset/particles.json');

var vm = new Vue({
  el: '#particles-js',
  beforeCreate: function () {
    // axios.get('https://api.github.com/users/its-alex/repos', {})
    // .then((res) => {
    //   var tmp = JSON.parse(res.request.response);

    //   console.log(tmp);
    //   for (var count=0; count < tmp.length; count++){
    //     var obj = {}

    //     obj.name = tmp[count].full_name.split('/')[1];
    //     obj.link = tmp[count].html_url;
    //     obj.description = tmp[count].description;
    //     console.log(obj);
    //     this.repos.push(obj);
    //   }
    //   console.log(this.repo);
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
  },
  data: {
    // repos: []
  }
});
