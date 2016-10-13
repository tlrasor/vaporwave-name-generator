(function(){
  "use strict";

  Vue.filter('make-aesthetic', function(str){
    var full = ""
    for(var i=0; i<str.length; i++) {
      if(str.charCodeAt(i)  >= 33 && str.charCodeAt(i) <= 270) {
        full += String.fromCharCode(str.charCodeAt(i) + 65248);
      } else if(str.charCodeAt(i) == 32) {
        full += String.fromCharCode(12288);
      }
    }
    return full;
  });

  Vue.component('greeting', {
    template: `
      <div class="section">
        <!-- <img src="https://vuejs.org/images/logo.png" alt="Vue logo"> -->
        <span class="column-sixth">
          <img src="img/roman-statue.png">
        </span>
        <span class="column-two-thirds">
          <h1>{{ greeting | make-aesthetic }}</h1>
        </span>
        <span class="column-sixth">
          <img src="img/roman-statue.png">
        </span>
      </div>
      `,
    props: ['greeting']
  });

  const generatorInputData = {
    defaultMonthOption: { text: '', value: 0 },
    monthOptions: [
      { text: 'Jan', value: 1 },
      { text: 'Feb', value: 2 },
      { text: 'Mar', value: 3 },
      { text: 'Apr', value: 4 },
      { text: 'May', value: 5 },
      { text: 'Jun', value: 6 },
      { text: 'Jul', value: 7 },
      { text: 'Aug', value: 8 },
      { text: 'Sep', value: 9 },
      { text: 'Oct', value: 10 },
      { text: 'Nov', value: 11 },
      { text: 'Dec', value: 12 }
    ]
  }

  Vue.component('generator', {
    template: `
      <div class="section">
        <span class="column-third">
          <p><label for="generator-input-name">Input your name</label></p>
          <input id="generator-input-name" v-model="inputName" placeholder="Your name">
          <br /><br />
          <p><label for="generator-input-month">Input your birth month</label></p>
          <select id="generator-input-month" v-model="selectedMonth">
            <option v-for="option in monthOptions" v-bind:value="option">
              {{ option.text }}
            </option>
          </select>
        </span>
        <span class="column-third">
          <p>Your old name is {{ inputName }}</p>
          <p>Your birth month is {{ selectedMonthText }}</p>
          <h3>Behold -- Your new name</h3>
          <p>{{derp | make-aesthetic }}</p>
        </span>
      </div>
      `,
    data: function() {
      return {
        selectedMonth: { text: '', value: 0 },
        monthOptions: [
          { text: 'Jan', value: 1 },
          { text: 'Feb', value: 2 },
          { text: 'Mar', value: 3 },
          { text: 'Apr', value: 4 },
          { text: 'May', value: 5 },
          { text: 'Jun', value: 6 },
          { text: 'Jul', value: 7 },
          { text: 'Aug', value: 8 },
          { text: 'Sep', value: 9 },
          { text: 'Oct', value: 10 },
          { text: 'Nov', value: 11 },
          { text: 'Dec', value: 12 }
        ],
        inputName: ''
      }
    },
    computed: {
      selectedMonthText : function() {
        return (this.selectedMonth != null ? this.selectedMonth.text : ' ');
      },
      derp: function() {
        let name = this.inputName
        let month = this.selectedMonth != null ? this.selectedMonth.text : ' ';
        return name + month;
      }
    }
  });

  new Vue({
    el: '#app',
    data: {
      greeting: 'Vaporwave name generator',
      docsURL: 'http://vuejs.org/guide/',
      gitterURL: 'https://gitter.im/vuejs/vue',
      forumURL: 'http://forum.vuejs.org/',
      generatorInput: generatorInputData,
      monthOptions: generatorInputData.monthOptions,
      defaultMonthOption: generatorInputData.defaultMonthOption
    },
    
    methods: {
      humanizeURL: function (url) {
        return url
          .replace(/^https?:\/\//, '')
          .replace(/\/$/, '')
      }
    }
  })
})();