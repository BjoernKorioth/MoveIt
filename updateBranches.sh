#!/usr/bin/env sh

git fetch -a;

git checkout -B account-management --track origin/account-management;
git merge --ff-only origin/master;
git push origin account-management;

git checkout -B admin-dashboard --track origin/admin-dashboard;
git merge --ff-only origin/master;
git push origin admin-dashboard;

git checkout -B information --track origin/information;
git merge --ff-only origin/master;
git push origin information;

git checkout -B leaderboard --track origin/leaderboard;
git merge --ff-only origin/master;
git push origin leaderboard;

git checkout -B socialfeed --track origin/socialfeed;
git merge --ff-only origin/master;
git push origin socialfeed;

git checkout -B progress --track origin/progress;
git merge --ff-only origin/master;
git push origin progress;

git checkout -B rewards --track origin/rewards;
git merge --ff-only origin/master;
git push origin rewards;

git checkout -B dashboard --track origin/dashboard;
git merge --ff-only origin/master;
git push origin dashboard;