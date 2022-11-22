### Getting started

first, you need to install dependencies with npm -- > `npm install` in `API/`

You must create the tables of the database (in postgres). there is a versionning system that is ready for you to use, test, revert and redeploy using sqitch. 

but to use sqitch, you must change configuration in the sqitch.conf file and specify the target : your database.

you must aso set-up your .env, it contains important info, you can check the required environement variables in the .env.example file.

once these 2 things are doàne you can launch this comand line `sqitch deploy`, this will create the tables of the database. You can also use `sqitch revert` to come back to older versions and even specify to what state you want to come back to; For more information on sqitch, please visit their offcicial doc ---> https://sqitch.org/docs/

### launching the API

in API, in a terminal do a `node index` or `nodex-dev index`, you can test the API on localhost 3001 and test it with insomnia for example. be sure to use in authorization headers the bearer token you get in response upon login in if you are doing tests with insomnia.

next step is to go check out the readme in front/mhuman :)