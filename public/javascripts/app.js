var granimInstance = new Granim({
    element: '#canvas-radial',
    name: 'radial-gradient',
    direction: 'radial',
    opacity: [1, 1],
    isPausedWhenNotInView: true,
    states : {
        "default-state": {
            gradients: [
                ['#ffb347', '#ffcc33'],
                ['#83a4d4', '#b6fbff'],
                ['#9D50BB', '#6E48AA']
            ]
        }
    }
});
