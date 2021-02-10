module.exports = function (grunt) {
    grunt.registerTask('replaceplaceholders', 'replace placeholders', function () {
        grunt.log.writeln("in grunt-replaceplaceholders task.");
        grunt.file.expand('./temp/*').forEach(function (campaignDirectory) {
            grunt.file.mkdir(campaignDirectory + '/translatedviews');
            grunt.log.writeln("campaign directory: ", campaignDirectory);
            grunt.file.expand(campaignDirectory + '/Translations/*').forEach(function (translationFile) {
                grunt.log.writeln("translation file: ", translationFile);
                let lang = translationFile.replace(campaignDirectory + '/Translations/', '').replace('.json', '');
                grunt.log.writeln("lang: ", lang);
                // for each translation, create a view
                // read view
                let translatedView = grunt.file.read(campaignDirectory + '/view.html');
                // for each view, replace placeholders
                let languageFile = grunt.file.read(translationFile);
                let languageObj = JSON.parse(languageFile);

                for (var key in languageObj.root) {
                    //grunt.log.writeln("key : ", key, " value : ", languageObj.root[key][0]);
                    translatedView = replaceAll(translatedView, '[[**' + key + '**]]', languageObj.root[key][0]);
                }
                let langTranslatedView = translatedView.replace('{seg}', lang);
                grunt.file.write(campaignDirectory + '/translatedviews/view_' + lang + '.html', langTranslatedView);
                let brandCssFilesArray = [];
                let subbrandCssFilesArray = [];

                grunt.file.expand(campaignDirectory + '/css/*').forEach(function (cssFile) {
                    if (grunt.file.isDir(cssFile)) {
                        //create a view for each brand
                        let brand = cssFile.replace(campaignDirectory + '/css/', '');
                        let subbrandtranslatedView;
                        grunt.file.expand(campaignDirectory + '/css/' + brand + '/*').forEach(function (brandCssFile) {
                            if (grunt.file.isDir(brandCssFile)) {
                                //create a view for each subbrand
                                let subbrand = brandCssFile.replace(campaignDirectory + '/css/' + brand + '/', '');
                                grunt.file.expand(campaignDirectory + '/css/' + brand + '/' + subbrand + '/*').forEach(function (subbrandCssFile) {
                                    if (grunt.file.isDir(subbrandCssFile)) {
                                        // we are at the language level (under subbrand). 
                                       // grunt.log.writeln("language level folder: ", subbrandCssFile);
                                        // check if a folder with the current language exists
                                        if (subbrandCssFile.split('/')[6] === lang) {
                                            // add the css files of this folder to the array
                                            grunt.file.expand(campaignDirectory + '/css/' + brand + '/' + subbrand + '/' + lang + '/*').forEach(function (subbrandLangCssFile) {
                                                subbrandCssFilesArray.push(subbrandLangCssFile.replace(campaignDirectory+'/', '').toLowerCase());
                                            })
                                        }
                                    }
                                    else {
                                        subbrandCssFilesArray.push(subbrandCssFile.replace(campaignDirectory+'/', '').toLowerCase());
                                    }
                                });
                                //inject subbrand level css
                                grunt.log.writeln("subbrandCssFilesArray: ", subbrandCssFilesArray);
                               subbrandtranslatedView = injectCssFilesArray(translatedView, subbrandCssFilesArray, "inject:subbrandcss");
                               subbrandtranslatedView = subbrandtranslatedView.replace('{seg}', brand + '_' + subbrand + '_' + lang)
                               grunt.file.write(campaignDirectory + '/translatedviews/view_' + lang + '_' + brand + '_' + subbrand   + '.html', subbrandtranslatedView);
                            }
                            else {
                                brandCssFilesArray.push(brandCssFile.replace(campaignDirectory+'/', '').toLowerCase());
                            }
                        })

                        grunt.log.writeln("brandCssFilesArray: ", brandCssFilesArray);
                        if (brandCssFilesArray.length > 0) {
                            // inject brand level css, only if we have brand level css
                            translatedView = injectCssFilesArray(translatedView, brandCssFilesArray, "inject:brandcss");
                            translatedView = translatedView.replace('{seg}',  brand + '_' + lang)
                            grunt.file.write(campaignDirectory + '/translatedviews/view_' + lang + '_'+ brand  + '.html', translatedView);
                        }
                    }
                });
            })
        });
    })

    grunt.registerTask('replacecomponents', 'replace components', function () {
        grunt.log.writeln("in grunt-replacecomponents task.");
        grunt.file.expand('./temp/*').forEach(function (campaignDirectory) {
            // for each view
            grunt.file.expand(campaignDirectory + '/translatedviews/*').forEach(function (translatedViewPath) {
                // read
                let translatedView = grunt.file.read(translatedViewPath);
                // replace component placeholder with component data
                let begin = translatedView.indexOf("[[@@");
                while (begin > 0) {
                    let end = translatedView.indexOf("@@]]")
                    let componentPlaceholder = translatedView.substring(begin, end + 4);
                    //grunt.log.writeln("componentPlaceholder: ", componentPlaceholder);
                    let componentName = componentPlaceholder.substring(4, componentPlaceholder.indexOf("@@]]"));
                    //grunt.log.writeln("componentName: ", componentName);
                    // read component content
                    let componentContent = grunt.file.read("./src/common/components/" + componentName);
                    translatedView = replaceAll(translatedView, componentPlaceholder, componentContent);
                    begin = translatedView.indexOf("[[@@");

                }
                grunt.file.write(translatedViewPath, translatedView);
            });
        })

    });
}

function injectCssFilesArray(translatedView, cssFilesArray, filesLocation) {
    let loc = '<!-- ' + filesLocation + ' -->';
    // find location
    let locationIndex = translatedView.indexOf(loc);
    if (locationIndex > 0) {
        console.log("filesLocation: " +filesLocation + "  locationIndex: ", locationIndex);
        locationIndex += loc.length;
        cssFilesArray.forEach(function (cssFileName) {
            translatedView = insert(translatedView, '<link rel="stylesheet" href="' + cssFileName + '">', locationIndex);
        })

        translatedView = replaceAll(translatedView,loc,'');
        translatedView = replaceAll(translatedView,'<!-- inject:brandcss -->', '');
        translatedView = replaceAll(translatedView,'<!-- inject:subbrandcss -->', '');
    }

    return translatedView;
}

function insert(main_string, ins_string, pos) {
    if (typeof (pos) == "undefined") {
        pos = 0;
    }
    if (typeof (ins_string) == "undefined") {
        ins_string = '';
    }
    return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
}

function replaceAll(text, search, replace) {
    if (replace === undefined) {
        return text;
    }

    return text.split(search).join(replace);
}

