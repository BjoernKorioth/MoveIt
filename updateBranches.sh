#!/usr/bin/env sh

git fetch -a;

git checkout account-management;
git merge origin/master;
git push;

git checkout add-activity;
git merge origin/master;
git push;

git checkout admin-dashboard;
git merge origin/master;
git push;

git checkout information;
git merge origin/master;
git push;

git checkout leaderboard;
git merge origin/master;
git push;

git checkout newsfeed;
git merge origin/master;
git push;

git checkout progress;
git merge origin/master;
git push;

git checkout rewards;
git merge origin/master;
git push;

git checkout socialfeed;
git merge origin/master;
git push;



