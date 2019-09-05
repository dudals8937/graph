const fs = require('fs');
const lineReader = require('line-reader');

module.exports = function(app){
  app.get('/', (req, res) => {

    let bgDistCount = 0;
    const bgDist = [];

    lineReader.eachLine('./public/data/beauty/vitaminc.txt', (line, last) => {
      bgDist[bgDistCount] = filterItems(line);
      bgDistCount++;

      if(last) {
        console.log('parsing done');
        bgDist.shift();
        makeFile(JSON.stringify(bgDist));
      }
    })

    function makeFile(data) {
      fs.writeFile('./public/data/beauty/vitaminc.json', data, (err) => {
        if(err) {
          return console.log(err)
        }
        console.log('File is saved successfully')
      })
    }

    function filterItems(line) {
      const arr = line.split('\t');
      const item = {};
      if(arr.length === 4) {
        item.begin = arr[0],
        item.end = arr[1],
        item.population = arr[2]
        item.average = Number(arr[3])
      }
      return item;
    }

    // function makeBgDistFile(data) {
    //   fs.writeFile('./public/data/bmi_dist.json', data, (err) => {
    //     if(err) {
    //       return console.log(err)
    //     }
    //     console.log('The bg_dist file is saved successfully')
    //   })
    // }

    // function filterBgDistItems(line) {
    //   const arr = line.split('\t');
    //   const item = {};
    //   if(arr.length === 21) {
    //     item.id = arr[0],
    //     item.sex = arr[1],
    //     item.age = arr[2],
    //     item.height = arr[3],
    //     item.weight = arr[4],
    //     item.waist = arr[5],
    //     item.bmi0 = arr[6],
    //     item.bmi = arr[7],
    //     item.rs3751812 = arr[8],
    //     item.rs11030104 = arr[9],
    //     item.rs11075990 = arr[10],
    //     item.rs10767664 = arr[11],
    //     item.rs62033400 = arr[12],
    //     // item.rs1458038 = arr[13],
    //     // item.rs10503669 = arr[14],
    //     // item.rs17231506 = arr[15],
    //     // item.rs2303790 = arr[16],
    //     item.gs_baseline = arr[13],
    //     item.rs_baseline = arr[14],
    //     item.gs_10year = arr[15],
    //     item.rs_10year = arr[16],
    //     item.gs_baseline.group = arr[17],
    //     item.rs_baseline.group = arr[18],
    //     item.gs_10year.group = arr[19],
    //     item.rs_10year.group = arr[20]
    //   }
    //   console.log(item)
    //   return item;
    // }
    res.render('index.html')
  })

  app.get('/chart', (req, res) => {
    res.render('chart')
  })
}