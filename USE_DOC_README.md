# Utiliser la documentation dans les applications angularJS

## Dans package.json:
```Java
    "gulp-ngdocs": "https://github.com/alizarion/gulp-ngdocs/tarball/017bdd66c027e6491cb26758e6442f46f16d3b8f"    
```
	
## Dans gulpfile.js:
```Java

gulp.task('docs', function () {
    var gulpDocs = require('gulp-ngdocs');
    var scripts = ['./dist/assets/lib/vendor.min.js','./dist/app/itesoft.debug.js'];
    var options = {
        html5Mode: false,
        styles:['./dist/assets/fonts/itesoft-bundle.min.css'],
        scripts:scripts,
        loadDefaults: {
            angular:false,
            angularAnimate: false
        },
        startPage: '/api',
        title: "Itesoft Awesome Docs",
        titleLink: "#/api"
    };
    var docFiles = buildConfig.appFiles.slice();
    docFiles.push('/src/app/**/*.ngdoc');
    console.log(docFiles);
    gulp.src(docFiles)
        .pipe(gulpDocs.process(options))
        .pipe(gulp.dest('./docs'));
    return  gulp.src('./main/assets/fonts/**/*')
        .pipe(gulp.dest('./docs/css/dist/assets/fonts'));
});

```

## Dans les fichiers AngularJS:
Vous devez ajouter une documentation basée sur ce modèle à vos services directives:

```Java
/**
 * @ngdoc service
 * @name NomProjet.service(ou directive):InvoiceFilterService (Name)
 * @module NomProjet
 *
 * @description
 * Service that manage tab
 *
 * <h1>Attribute</h1>
 *  <table class="table">
 *  <tr>
 *      <th>
 *          Function
 *      </th>
 *      <th>
 *          Description
 *      </th>
 *  </tr>
 *  <tr>
 *      <td>
 *          search
 *      </td>
 *      <td>
 *          Run search with filter added in FilterService
 *      </td>
 *  </tr>
 *  </table>
 *
 **/
```

## Génération de la doc
Dezipper le fichier docs.zip à la racine de votre projet vous devez obtenir une structure comme ceci:
-dist
-docs
    |-css
    |-font
    |-js
    |-partials
-src


```Java
gulp docs
```

Cette commande va completer le dossier partials du répertoire docs à la racine du projet.

## Tester
Pour tester cliquer sur run index.html

