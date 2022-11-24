
         let selectedRegion = $('#region').children("option:selected").val();
         let selectedCities = $('#cities').children("option:selected").val();
 
        var region_fetch = $.getJSON( "https://psgc.gitlab.io/api/regions/", function(data) {

            //console.log(region_fetch);

            var html = '';
            var len = data.length;
            html += '<option value="" selected="" class="text-center" disabled>------> SELECT REGION <------</option>';
            for (var i = 0; i < len; i++){
                html += '<option value="' + data[i].code + '">' +    data[i].regionName + '</option>';
            }
            $('#region').append(html);
        });
    
        $(function(){
            $("#region").on('change',function(){
                $('#province').empty();
                $('#cities').empty();
                $('#barangays').empty();
                $('#province').val( $('#province').find("option[selected]").val() );
                var selectedRegion = $(this).children("option:selected").val();
                var fill_provinces = "https://psgc.gitlab.io/api/regions/" + selectedRegion + "/provinces";
                console.log(fill_provinces);

                 var province_fetch = $.getJSON(fill_provinces, function(data){
                        var html = '';
                        var len = data.length;
                        html += '<option value="" selected="" class="text-center" disabled>------> SELECT PROVINCE <------</option>';
                        for (var i = 0; i < len; i++){
                            html += '<option value="' + data[i].code + '">' +    data[i].name + '</option>';
                        }
                        $('#province').append(html);
                        
                 });
                 
                });
            $("#province").on('change',function(){
                $('#cities').empty();
                $('#barangays').empty();
                var selectedProvince = $(this).children("option:selected").val();
                var fill_cities = "https://psgc.gitlab.io/api/provinces/" + selectedProvince + '/cities-municipalities/';
                //console.log(fill_cities);

                    var cities_fetch = $.getJSON(fill_cities, function(data){
                        var html = '';
                        var len = data.length;
                        html += '<option value="" selected="" class="text-center" disabled>------> SELECT PROVINCE <------</option>';
                        for (var i = 0; i < len; i++){
                            html += '<option value="' + data[i].code + '">' +    data[i].name + '</option>';
                        }
                        $('#cities').append(html);
                    });
            });    
            $("#cities").on('change',function(){
                $('#barangays').empty();
                var selectedCities = $(this).children("option:selected").val();
                var fill_municipalities = "https://psgc.gitlab.io/api/cities-municipalities/" + selectedCities + '/barangays/';
                //console.log(fill_municipalities);

                    var cities_municipalities = $.getJSON(fill_municipalities, function(data){
                        var html = '';
                        var len = data.length;
                        html += '<option value="" selected="" class="text-center" disabled>------> SELECT BARANGAY <------</option>';
                        for (var i = 0; i < len; i++){
                            html += '<option value="' + data[i].code + '">' +    data[i].name + '</option>';
                        }
                        $('#barangays').append(html);
                    });
            }); 
        });
