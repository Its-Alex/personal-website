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
  template: `
    <div class="content">
      <img class="profile" src="asset/img/profile.jpg">
      <br/>
      <h1>
        Alexandre M.
        <br/>
        Student developer
      </h1>
      <br/>
      <!-- <ul>
          <li v-for="repo in repos">
            <a :href="repo.link">{{ repo.name }}</a>
            <br/>
            {{ repo.description }}
          </li>
      </ul> -->
      <canvas id="doughnutChart" width="225" height="230"></canvas>
      <div class="divlink">
          <a href="https://twitter.com/xskyzie"><img class="imglink" src="asset/img/twitter.svg"></a>
          <a href="https://github.com/Its-Alex"><img class="imglink" src="asset/img/github.svg"></a>
          <a href="https://www.linkedin.com/in/alexandre-marre-4ba39b132/"><img class="imglink" src="asset/img/linkedin.svg"></a>
      </div>
    </div>
  `,
  data: {
    // repos: []
  }
});
