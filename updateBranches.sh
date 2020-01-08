#!/usr/bin/env sh

git fetch -a;

git checkout origin/account-management;
git merge origin/master;
git push;

git checkout origin/admin-dashboard;
git merge origin/master;
git push;

git checkout origin/information;
git merge origin/master;
git push;

git checkout origin/leaderboard;
git merge origin/master;
git push;

git checkout origin/socialfeed;
git merge origin/master;
git push;

git checkout origin/progress;
git merge origin/master;
git push;

git checkout origin/rewards;
git merge origin/master;
git push;

git checkout origin/dashboard;
git merge origin/master;
git push;