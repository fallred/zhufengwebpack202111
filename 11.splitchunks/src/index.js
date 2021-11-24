document.getElementById('play').addEventListener('click', () => {
    import(/* webpackPrefetch: true */ './video').then(result => {
        console.log(result.default);
    });
});