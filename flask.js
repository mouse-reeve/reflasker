var original = $('#flask').html();
var flasked = undefined;
var flaskMode = false;

var toggle = function () {
    if (!flaskMode) {
        if (!flasked) {
            flasked = flaskify($('#flask')[0]);
        } else {
            $('#flask').html(flasked);
        }
    } else {
        $('#flask').html(original);
    }
    flaskMode = !flaskMode;
};

var flaskify = function (element) {
    if (!element.tagName) {
        // text
        element.data = reflask(element.data);
        return element;
    } else if ($(element).children().length > 0) {
        $.each($(element).contents(), function (i, item) {
            item = flaskify(item);
        });
    } else {
        // DOM node with text only
        var text = $(element).text();
        $(element).html(reflask(text));
        return element;
    }
};

var reflask = function (text) {
    text = text.split(' ');
    $.each(text, function (i, item) {
        item = item.trim();
        if (!item) {
            return;
        }
        var flask = ' flask';
        // check for strings of just punctuation or numbers
        if (item.match(/^[\.\,\!\?\-]+$/) ||
                    (!isNaN(parseFloat(item)) && item == parseFloat(item)) ||
                    item.match(/^[\s]+$/)) {
            flask = ' ' + item;
        } else if (item.match(/^an$|^and$|^a$|^the$|^with$|^in$|^for$/)) {
            flask = ' ' + item;
        } else {
            var first = item.slice(0,1);
            if (item.toUpperCase() === item) {
                flask = flask.toUpperCase();
            } else if (first.toLowerCase() !== first) {
                flask = ' Flask';
            }
            var ending = item.match(/ing$|ed$|s$|ful$|ular$|ly$|\.js$|\.$|,$|\-end$/);
            if (ending) {
                flask += ending[0];
            }
        }
        text[i] = flask;
    });
    return text.join('');
};

toggle();
$('#flask-toggle').click(toggle);
