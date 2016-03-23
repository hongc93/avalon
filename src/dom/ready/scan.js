function scan(nodes) {
    for (var i = 0, elem; elem = nodes[i++]; ) {
        if (elem.nodeType === 1) {
            var $id = hasController(elem)
            var vm = avalon.vmodels[$id]
            if (vm && !vm.$element) {
                var str = elem.outerHTML
                avalon(elem).removeClass('ms-controller')

                vm.$element = elem
                var now = new Date() - 0
                var vtree = avalon.lexer(str)
                avalon.log('create primitive vtree', new Date - now)
                now = new Date()
                vm.$render = avalon.render(vtree)
                avalon.log('create template Function ', new Date - now)
                avalon.rerenderStart = new Date
                elem.vtree = vtree
                avalon.batch($id, true)

            } else if (!$id) {
                scan(elem.childNodes)
            }
        }
    }
}

module.exports = avalon.scan = function (a) {
    if (!a || !a.nodeType) {
        avalon.warn('[avalon.scan] first argument must be element , documentFragment, or document')
        return
    }
    if (getController(a)) {
        avalon.warn('[avalon.scan] first argument must has "ms-controller" attribute')
        return
    }
    scan([a])
}
function hasController(a) {
    return a.getAttribute('ms-controller')
}
function getController(a) {
    if (a.getAttribute && hasController(a)) {
        return true
    }
    //document.all http://www.w3help.org/zh-cn/causes/BX9002
    var all = a.getElementsByTagName ? a.getElementsByTagName('*') : a.querySelectorAll('*')
    for (var i = 0, node; node = all[i++]; ) {
        if (hasController(a)) {
            return true
        }
    }
    return false
}