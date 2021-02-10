var gulp = require('gulp'),
  inject = require('gulp-inject'),
  rename = require("gulp-rename"),
  clean = require('gulp-clean'),
  runSequence = require('run-sequence'),
  xml2json = require('gulp-xml2json'),
  watch = require('gulp-watch'),
  sass = require('gulp-sass'),
  naturalSort = require('gulp-natural-sort'),
  useref = require('gulp-useref'),
  gulpif = require('gulp-if'),
  uglify = require('gulp-uglify'),
  babel = require('gulp-babel'),
  zip = require('gulp-zip'),
  artifactoryUpload = require('gulp-artifactory-upload'),
  gutil = require('gulp-util'),
  cachebust = require('gulp-cache-bust'),
  minifyCss = require('gulp-clean-css');
const debug = require('gulp-debug');
require('gulp-grunt')(gulp);
var fs = require('fs');

var basePaths = {
  src: './src/Campaigns/' + getCampaignId() + '/',
  common: './src/common/',
  temp: './temp/' + getCampaignId() + '/',
  distdev: './distdev/' + getCampaignId() + '/',
  distrelease: './distrelease/' + getCampaignId() + '/',
};

var paths = {
  images: {
    src: basePaths.src + 'images/**/*',
    distdev: basePaths.distdev + 'images/',
    distrelease: basePaths.distrelease + 'images/',

  },
  scripts: {
    src: basePaths.src + 'scripts/**/*',
    temp: basePaths.temp + 'scripts/',
    distdev: basePaths.distdev + 'scripts/',
    distrelease: basePaths.distrelease + 'scripts/'
  },
  css: {
    src: basePaths.src + 'css/**/*',
    temp: basePaths.temp + 'css/',
    distdev: basePaths.distdev + 'css/',
    distrelease: basePaths.distrelease + 'css/'
  },
  commoncss: {
    src: basePaths.common + 'css/**/*',
    temp: basePaths.temp + 'css/',
    distdev: basePaths.distdev + 'css/',
    distrelease: basePaths.distrelease + 'css/'
  },
  commonscripts: {
    src: basePaths.common + 'scripts/**/*',
    temp: basePaths.temp + 'scripts/1/',
    distdev: basePaths.distdev + 'scripts/',
    distrelease: basePaths.distrelease + 'scripts/'
  }
};

gulp.task('createview', function () {
  var target = gulp.src('./toolsource/container.html');
  return target
    .pipe(inject(gulp.src('./temp/' + getCampaignId() + '/css/*.css', { read: false }).pipe(naturalSort()), { ignorePath: 'temp/' + getCampaignId(), addRootSlash: false }))
    .pipe(inject(gulp.src(paths.scripts.temp + '/**/*.js', { read: false }).pipe(naturalSort()), { ignorePath: 'temp/' + getCampaignId(), addRootSlash: false }))
    .pipe(inject(gulp.src('./src/Campaigns/' + getCampaignId() + '/MockData/*.js', { read: false }), { name: 'mockdata', ignorePath: 'src/Campaigns/' + getCampaignId(), addRootSlash: false }))
    .pipe(inject(gulp.src(['./src/Campaigns/' + getCampaignId() + '/view.html'], { read: true }), {
      starttag: '<!-- inject:view:html -->',
      transform: function (filePath, file) {
        // return file contents as string 
        return file.contents.toString('utf8')
      },
    }))

    .pipe(rename({
      basename: "view"
    }))

    .pipe(gulp.dest('./temp/' + getCampaignId()));
});

gulp.task('createviewrel', function () {
  var target = gulp.src('./toolsource/releasecontainer.html');
  return target
    .pipe(inject(gulp.src('./temp/' + getCampaignId() + '/css/*.css', { read: false }).pipe(naturalSort()), { ignorePath: 'temp/' + getCampaignId(), addRootSlash: false, removeTags: true }))
    .pipe(inject(gulp.src(paths.scripts.temp + '/**/*.js', { read: false }).pipe(naturalSort()), { ignorePath: 'temp/' + getCampaignId(), addRootSlash: false }))
    .pipe(inject(gulp.src(['./src/Campaigns/' + getCampaignId() + '/view.html'], { read: true }), {
      removeTags: true,
      starttag: '<!-- inject:view:html -->',
      transform: function (filePath, file) {
        // return file contents as string 
        return file.contents.toString('utf8')
      },
    }))
    .pipe(rename({
      basename: "view"
    }))
    .pipe(gulp.dest('./temp/' + getCampaignId()));
});

gulp.task('sass', function () {
  return gulp.src('./src/Campaigns/' + getCampaignId() + '/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./temp/' + getCampaignId() + '/css'));
});


gulp.task('copytotempscripts', function () {
  gulp.src([paths.scripts.src]).pipe(babel({ presets: ['es2015'] })).pipe(gulp.dest(paths.scripts.temp));
  return gulp.src([paths.commonscripts.src]).pipe(babel({ presets: ['es2015'] })).pipe(gulp.dest(paths.commonscripts.temp));
})

gulp.task('copytotempcss', function () {
  gulp.src([paths.css.src]).pipe(gulp.dest(paths.css.temp));
  return gulp.src([paths.commoncss.src]).pipe(rename({ prefix: "1_" })).pipe(gulp.dest(paths.commoncss.temp));
})

gulp.task('copytodist', function () {
  gulp.src([paths.scripts.temp + '**/*']).pipe(gulp.dest(paths.scripts.distdev));
  gulp.src([paths.images.src]).pipe(gulp.dest(paths.images.distdev));
  gulp.src(['./temp/' + getCampaignId() + '/css/**/*']).pipe(gulp.dest('./distdev/' + getCampaignId() + '/css'));
  gulp.src(['./src/Campaigns/' + getCampaignId() + '/fonts/**/*']).pipe(gulp.dest('./distdev/' + getCampaignId() + '/fonts'));
  gulp.src(['./src/common/images/**/*']).pipe(gulp.dest('./distdev/' + getCampaignId() + '/images'));
  gulp.src([basePaths.src + 'config.json']).pipe(gulp.dest(basePaths.distdev));
  return gulp.src(['./temp/' + getCampaignId() + '/translatedviews/**/*']).pipe(gulp.dest('./distdev/' + getCampaignId()));
})

gulp.task('copytodistrel', function () {
  gulp.src([paths.images.src]).pipe(gulp.dest(paths.images.distrelease));
  gulp.src(['./src/Campaigns/' + getCampaignId() + '/fonts/**/*']).pipe(gulp.dest('./distrelease/' + getCampaignId() + '/fonts'));
  gulp.src(['./src/common/images/**/*']).pipe(gulp.dest('./distrelease/' + getCampaignId() + '/images'));
  gulp.src([basePaths.src + 'config.json']).pipe(gulp.dest('./distrelease/' + getCampaignId()));
  return gulp.src(['./temp/' + getCampaignId() + '/min/**/*']).pipe(gulp.dest('./distrelease/' + getCampaignId()));

})

gulp.task('copymockdatadist', function () {
  return gulp.src(['./src/Campaigns/' + getCampaignId() + '/MockData/**/*']).pipe(gulp.dest('./distdev/' + getCampaignId() + '/MockData'));
});

gulp.task('copymockapidist', function () {
  return gulp.src(['./toolsource/mockapi.js']).pipe(gulp.dest(basePaths.temp)).pipe(gulp.dest(basePaths.distdev));
})

gulp.task('cleantemp', function () {
  return gulp.src('temp', { read: false })
    .pipe(clean());
});

gulp.task('cleandist', function () {
  return gulp.src('distdev', { read: false })
    .pipe(clean());
});

gulp.task('cleandistrelease', function () {
  return gulp.src('distrelease', { read: false })
    .pipe(clean());
});

gulp.task('convertxml2json', function () {
  gulp.src('./src/Campaigns/' + getCampaignId() + '/Translations/*.xml')
    .pipe(debug({ title: 'Starting Translations XML Conversion:' }))
    .pipe(xml2json())
    .pipe(rename({ extname: '.json' }))
    .pipe(gulp.dest('./temp/' + getCampaignId() + '/Translations'));
});



gulp.task('builddev', function (callback) {
  runSequence(
    ['cleantemp', 'cleandist'],
    ['copytotempscripts', 'sass', 'convertxml2json', 'copytotempcss'],
    ['createview'],
    'grunt-replaceplaceholders',
    'grunt-replacecomponents',
    ['copytodist', 'copymockdatadist', 'copymockapidist'],
    callback);
});
gulp.task('builddev1', function (callback) {
  runSequence(
    ['cleantemp', 'cleandist'],
    ['copytotempscripts', 'sass', 'convertxml2json', 'copytotempcss'],
    callback);
});
gulp.task('builddev2', function (callback) {
  runSequence(
    ['createview'],
    'grunt-replaceplaceholders',
    'grunt-replacecomponents',
    ['copytodist', 'copymockdatadist', 'copymockapidist'],
    callback);
});

gulp.task('buildrel', function (callback) {
  runSequence(
    ['cleantemp', 'cleandistrelease'],
    ['copytotempscripts', 'sass', 'convertxml2json', 'copytotempcss'],
    ['createviewrel'],
    'grunt-replaceplaceholders',
    'grunt-replacecomponents',
    'deletetempview',
    'copytranslatedviews',
    'bundleandmin',
    ['copytodistrel'],
    callback);
});

gulp.task('buildrel1', function (callback) {
  runSequence(
    ['cleantemp', 'cleandistrelease'],
    ['copytotempscripts', 'sass', 'convertxml2json', 'copytotempcss'],
    callback);
});

gulp.task('buildrel2', function (callback) {
  runSequence(
    ['createviewrel'],
    'grunt-replaceplaceholders',
    'grunt-replacecomponents',
    'deletetempview',
    'copytranslatedviews',
    'bundleandmin',
    ['copytodistrel'],
    callback);
});

gulp.task('deploy', function (callback) {
  runSequence(
    'ziprelease',
    'uploadtoartifactory',
    callback);
});

gulp.task('ziprelease', () =>
  gulp.src(basePaths.distrelease + '**/*')
    .pipe(zip('RICHCampaign.zip'))
    .pipe(gulp.dest(basePaths.distrelease))
);

gulp.task('uploadtoartifactory', function () {
  return gulp.src('./distrelease/' + getCampaignId() + '/' + 'RICHCampaign.zip')
    .pipe(artifactoryUpload({
      url: 'http://artifactoryprod.888holdings.corp:8081/artifactory/Web-local/RICH-Campaigns/' + getCampaignId() + '/' + getCurrentVersion() + '/',
      username: 'buildwebteam',
      password: 'Aa123456'
    }))
    .on('error', gutil.log);
});

gulp.task('deletetempview', function () {
  return gulp.src(basePaths.temp + 'view.html', { read: false })
    .pipe(clean());
});

gulp.task('copytranslatedviews', function () {
  return gulp.src(['./temp/' + getCampaignId() + '/translatedviews/**/*']).pipe(gulp.dest(basePaths.temp));
})


gulp.task('bundleandmin', function () {
  return gulp.src(basePaths.temp + '*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(cachebust({ type: 'timestamp' }))
    .pipe(gulp.dest(basePaths.temp + '/min/'));
});

gulp.task('watch', function () {
  return watch('./src/Campaigns/' + getCampaignId() + '/**', { ignoreInitial: false },
    () => runSequence('builddev'))
});

function getCampaignId () {
  var campaignId = 1;
  var i = process.argv.indexOf("--campaignid");
  if (i > -1) {
    campaignId = process.argv[i + 1];
  }
  //console.log("campaignId from argument: ", campaignId);
  return campaignId
}

var currentVersion = '';

function getCurrentVersion () {
  let configPath = 'src/Campaigns/' + getCampaignId() + '/configuration/';
  let configFile = configPath + '.version.config';
  if (currentVersion === '') {
    if (!fs.existsSync(configFile)) {
      // check if folder exists
      if (!fs.existsSync(configPath)) {
        gutil.log("folder doesn't exist.");
        // create the folder
        fs.mkdirSync(configPath);
      }
      if (!fs.existsSync(configFile)) {
        gutil.log("creating the file: " + configPath);
        //create the file
        currentVersion = '1';
        fs.writeFileSync(configFile, currentVersion);
      }
    }
    else {
      gutil.log("reading the file");
      // read the file
      let data = fs.readFileSync(configFile);
      currentVersion = parseInt(data, 10) + 1;;
      fs.writeFileSync(configFile, currentVersion);
    }
  }
  gutil.log("End getCurrentVersion. currentVersion: ", currentVersion);
  return currentVersion;
}