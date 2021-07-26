const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Webpack utilise ce module Node.js pour travailler avec les dossiers.
const path = require('path');

// Dotenv Plugin
const Dotenv = require('dotenv-webpack');

// Ceci est la configuration principale de ton projet.
// Ici, tu peux écrire les différentes options que tu souhaites, et dire à Webpack quoi faire.
module.exports = {

  // Ceci est le chemin vers le "point d'entrée" de ton app.
  // C'est depuis ce fichier que Webpack commencera à travailler.
  entry: './src/js/index.js',

  // regarde si jamais un changement est appliqué, et applique alors les changements nécessaires en live,
  // sans que tu aies à retaper npm run build à chaque fois
  watch: true,

  // C'est ici qu'on dit à Webpack où mettre le fichier résultant avec tout ton JS.
  output: {
    // Le chemin relatif au dossier courant (la racine du projet)
    path: path.resolve(__dirname, 'dist'),
    // Le nom du fichier de ton bundle JS
    filename: 'bundle.js',
    // L'URL relatif au HTML pour accéder aux assets de l'application. Ici,
    // le HTML est situé à la racine du projet, donc on met une chaîne vide.
    publicPath: '',
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  
  // C'est ici qu'on dit à Webpack les règles de transformation de tes fichiers
  // en fonction du type de fichier qu'il rencontre 
  module: {
    rules: [
      {
        // Pour le JS :
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          // loader Babel qui transforme les fichiers JS ES6 en ES5
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        // Pour le SASS :
        test: /\.(sa|sc|c)ss$/, // applique la règle aux fichiers .sass, .scss et .css
        use: [
          // Attention, les loaders sont ajoutés en sens inverse !!
          // Effectivement, c'est le dernier loader qui est exécuté en premier.
          // Donc celui-ci arrive en fin de chaîne :
          {
            // On le met en tout premier, afin qu'il soit exécuté en dernier,
            // une fois que tous les changements souhaités sont appliqués à notre CSS.
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader', // Ce loader permet d'utiliser url() et @import dans ton CSS
          },
          {
            // Ensuite on utilise le loader de postCSS, qui ajoutera un minifier par exemple,
            // ou bien un préfixeur automatique des règles CSS (--moz par exemple)
            loader: 'postcss-loader',
          },
          {
            // En premier, on transforme le SASS en CSS :
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        // Pour les images :
        // pour tous les fichiers contenant les extensions suivantes : "png", "jpg", "jpg", "gif" et "svg", on appelle le loader "assetModule" 
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        // Pour les fonts :
        // pour tous les fichiers contenant les extensions suivantes : "woff", "woff2", "ttf", "otf" et "eot", on appelle le loader "assetModule" 
        test: /\.(woff|woff2|ttf|otf|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: "fonts/[hash][ext]"
	},
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      // indique à MiniCssExtractPlugin que tout notre CSS doit être bundlé dans le fichier dist/bundle.css
      filename: 'bundle.css',
    }),
    new Dotenv(),
  ],

  // Par défaut, le mode de Webpack est "production". En fonction de ce qui est
  // écrit ici, tu pourras appliquer différentes méthodes dans ton bundle final.
  // Pour le moment, nous avons besoin du mode "développement", car nous n'avons,
  // par exemple, pas besoin de minifier notre code.
  mode: 'development',
};
