const axios = require('axios');
const fs = require('fs');

var app_id_and_key = "?app_id=d99ebe96&app_key=6983690f5f70beb4e3144ab17ac24903";

var client = axios.create({
    baseURL: "https://api.adzuna.com/v1/api/jobs/us/search/"
});

async function get_adzuna_data() {
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

get_adzuna_data();