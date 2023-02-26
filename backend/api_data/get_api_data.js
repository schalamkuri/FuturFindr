const axios = require('axios');
const fs = require('fs');

async function get_adzuna_data() {

    var app_id_and_key = "?app_id=d99ebe96&app_key=6983690f5f70beb4e3144ab17ac24903";

    var client = axios.create({
        baseURL: "https://api.adzuna.com/v1/api/jobs/us/search/"
    });

    var response_str = "";
    try {
        // 20 pages of 50 results each of full time jobs
        // 20 pages of 50 results each of part time jobs

        // var query = "&results_per_page=50&full_time=1";
        // var file_num = 1;
        // for (var pg_num = 1; pg_num <= 20; pg_num++) {
        //     var response = await client.get(pg_num.toString() + app_id_and_key + query);
        //     response_str = JSON.stringify(response.data);
        //     fs.writeFile("full_time_jobs" + file_num.toString() + ".json", response_str, function(err) {
        //         if (err) {
        //             return console.log(err);
        //         }
        //         console.log("The file " + file_num.toString() + " was saved!");
        //     });
        //     file_num++;
        // }

        var query = "&results_per_page=50&part_time=1";
        var file_num = 1;
        for (var pg_num = 1; pg_num <= 20; pg_num++) {
            var response = await client.get(pg_num.toString() + app_id_and_key + query);
            response_str = JSON.stringify(response.data);
            fs.writeFile("part_time_jobs" + file_num.toString() + ".json", response_str, function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file " + file_num.toString() + " was saved!");
            });
            file_num++;
        }
    }
    catch (error) {
        console.error(error);
    }
}

// get_adzuna_data();

async function get_apartments_data() {

    var app_id_and_key = "?app_id=d99ebe96&app_key=6983690f5f70beb4e3144ab17ac24903";

    var client = axios.create({
        baseURL: "https://api.adzuna.com/v1/api/jobs/us/search/"
    });

    var response_str = "";
    try {
        // 20 pages of 50 results each of full time jobs
        // 20 pages of 50 results each of part time jobs

        // var query = "&results_per_page=50&full_time=1";
        // var file_num = 1;
        // for (var pg_num = 1; pg_num <= 20; pg_num++) {
        //     var response = await client.get(pg_num.toString() + app_id_and_key + query);
        //     response_str = JSON.stringify(response.data);
        //     fs.writeFile("full_time_jobs" + file_num.toString() + ".json", response_str, function(err) {
        //         if (err) {
        //             return console.log(err);
        //         }
        //         console.log("The file " + file_num.toString() + " was saved!");
        //     });
        //     file_num++;
        // }

        var query = "&results_per_page=50&part_time=1";
        var file_num = 1;
        for (var pg_num = 1; pg_num <= 20; pg_num++) {
            var response = await client.get(pg_num.toString() + app_id_and_key + query);
            response_str = JSON.stringify(response.data);
            fs.writeFile("part_time_jobs" + file_num.toString() + ".json", response_str, function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file " + file_num.toString() + " was saved!");
            });
            file_num++;
        }
    }
    catch (error) {
        console.error(error);
    }

}

// get_apartments_data();

async function get_college_data() {

    // const options = {
    // method: 'GET',
    // url: 'https://university-college-list-and-rankings.p.rapidapi.com/api/top-universities/us',
    // headers: {
    //     'X-RapidAPI-Key': '1fd425bbf7mshde3284f235feab6p1689f5jsn34dd01c411a6',
    //     'X-RapidAPI-Host': 'university-college-list-and-rankings.p.rapidapi.com'
    // }
    // };

    // try {
    //     var response = axios.request(options);
    //     var response_str = JSON.stringify(response.data);
    //     console.log(response_str);
    // }
    // catch (error) {
    //     console.error(error);
    // }

    // const options = {
    // method: 'GET',
    // url: 'https://university-college-list-and-rankings.p.rapidapi.com/api/top-universities/us',
    // headers: {
    //     'X-RapidAPI-Key': '1fd425bbf7mshde3284f235feab6p1689f5jsn34dd01c411a6',
    //     'X-RapidAPI-Host': 'university-college-list-and-rankings.p.rapidapi.com'
    // }
    // };

    const options = {
        method: 'GET',
        url: 'https://university-college-list-and-rankings.p.rapidapi.com/api/university/info',
        params: {id: '5278'},
        headers: {
          'X-RapidAPI-Key': '1fd425bbf7mshde3284f235feab6p1689f5jsn34dd01c411a6',
          'X-RapidAPI-Host': 'university-college-list-and-rankings.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        var response_str = JSON.stringify(response.data);
        fs.writeFile("college_data.json", response_str, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    }).catch(function (error) {
        console.error(error);
    });

}

// get_college_data();