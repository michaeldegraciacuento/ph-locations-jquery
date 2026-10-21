$(function () {
    const API = 'https://psgc.gitlab.io/api';

    const $region = $('#region');
    const $province = $('#province');
    const $cities = $('#cities');
    const $barangays = $('#barangays');
    const $error = $('#error');

    function reset($select, placeholder) {
        $select.empty().prop('disabled', true);
        if (placeholder) {
            $select.append($('<option>', { value: '', text: placeholder, selected: true, disabled: true }));
        }
    }

    function populate($select, url, label) {
        reset($select, 'Loading...');
        $error.addClass('d-none');

        return $.getJSON(url)
            .done(function (data) {
                data.sort(function (a, b) {
                    return (a.name || '').localeCompare(b.name || '');
                });

                reset($select, '-- Select ' + label + ' --');
                data.forEach(function (item) {
                    const text = item.regionName ? item.name + ' (' + item.regionName + ')' : item.name;
                    $select.append($('<option>', { value: item.code, text: text }));
                });
                $select.prop('disabled', data.length === 0);
            })
            .fail(function () {
                reset($select, 'Failed to load ' + label.toLowerCase());
                $error.text('Unable to load ' + label.toLowerCase() + '. Please try again later.').removeClass('d-none');
            });
    }

    reset($province);
    reset($cities);
    reset($barangays);
    populate($region, API + '/regions/', 'Region');

    $region.on('change', function () {
        const code = $(this).val();
        reset($province);
        reset($cities);
        reset($barangays);

        populate($province, API + '/regions/' + code + '/provinces/', 'Province').done(function (provinces) {
            if (!provinces.length) {
                reset($province, 'No provinces in this region');
                populate($cities, API + '/regions/' + code + '/cities-municipalities/', 'City / Municipality');
            }
        });
    });

    $province.on('change', function () {
        reset($cities);
        reset($barangays);
        populate($cities, API + '/provinces/' + $(this).val() + '/cities-municipalities/', 'City / Municipality');
    });

    $cities.on('change', function () {
        reset($barangays);
        populate($barangays, API + '/cities-municipalities/' + $(this).val() + '/barangays/', 'Barangay');
    });
});
