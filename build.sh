#!/bin/bash

webpack --config webpack.production.js

scp -rpq "/Users/Jed/Home.Web/pub" jed.bz:/cygdrive/d/www/jed.bz
scp -rpq "/Users/Jed/Home.Web/index.html" jed.bz:/cygdrive/d/www/jed.bz/admin/index.html