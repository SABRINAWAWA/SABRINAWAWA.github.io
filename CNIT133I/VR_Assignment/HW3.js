AFRAME.registerComponent('color-toggle', {
    init: function () {
        let el = this.el;
        this.toggleColor = function () {
            console.log("Change color!")
            el.setAttribute('color', 'blue');
        }
        this.el.addEventListener('click', this.toggleColor);
    },
    remove: function () {
        this.el.removeEventListener('click', this.toggleColor);
    }
})

AFRAME.registerComponent('cylinder-rotation', {
    init: function () {
        let el = this.el;
        this.animateMoving = function (e) {
            let params = {
                property: "rotation",
                dur: 8000,
                from: {
                    x: 30,
                    y: -20,
                    z: 0
                },
                to: {
                    x: 30,
                    y: -20,
                    z: 360,
                },
                loop: true,
            };
            el.setAttribute('animation__rotate', params);
        }
        this.el.addEventListener('click', this.animateMoving);
    },
    remove: function () {
        this.el.removeEventListener('click', this.animateMoving);
    }
});

AFRAME.registerComponent('moving', {
    init: function () {
        let el = this.el;
        this.animateMoving = function (e) {
            let curPosition = el.getAttribute('position');
            let params = {
                property: 'position',
                to: {
                    x: curPosition.x,
                    y: curPosition.y+0.5,
                    z: curPosition.z
                },
                dur: 3000,
                easing: 'easeInOutElastic'
            };
            el.setAttribute('animation', params);
        }
        this.el.addEventListener('click', this.animateMoving);
    },
    remove: function () {
        this.el.removeEventListener('click', this.animateMoving);
    }
});
