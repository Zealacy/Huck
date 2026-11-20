# Huck

**Pacific Huck** is a retro arcade game about West Coast high school ultimate frisbee.

Open `index.html` in a browser to play. It's a single file with no build step. `src/pacific-huck.html` is the same game without the HTML wrapper, used for publishing.

## Modes
- **Quick game:** pick any two of 17 real high school programs from Washington, Oregon and California and play to 7.
- **Rosters and subs:** every team carries 14 players. Before each point you call a line of seven (O-line, D-line, freshest legs or your own picks), or let the coach do it. Players tire the more points they play and recover on the sideline. Subs only happen between points, except for injury subs after layouts and sky battles. Each team gets two timeouts.
- **Offense styles:** pick how your team lines up on O-line points: **Vertical** (2 handlers, 5-man stack; the default; cuts come from the back of the stack, where there's the most room, and each cutter rejoins at the front), **Horizontal** (3 handlers across the back, 4 cutters across the field, handlers swinging it side to side), **4-1** (4 cutters on the disc side cut in turn, 1 alone on the far side goes deep) or **1-4** (1 alone on the disc side works under, 4 on the far side go deep). Head coach mode sets it in the hub; quick games set it on the pre-game screen. Cuts are automatic and there is always one on: the next cutter jabs as the one ahead finishes, never more than two in the lane, about 75% to the live side, and the order and timing change every point. Every cut is a real one: a hard jab the other way, then at least 10 yards coming under or 16 going deep. After a cut, each player returns to his own spot (in Vertical, the front of the stack, so the next man is at the back). Lines with too few handlers fill in with their best throwers.
- **Background offense:** there's always someone cutting on the live side (the side the mark gives you), with break-side cuts and second cutters around it. When you throw, both teams start setting up for where it'll be caught, and a continuation cut is timed to break just as it's caught; cuts that still make sense for the new thrower keep going. After a short swing or dump the thrower sometimes takes off for the give-and-go. Against a zone, your team switches to zone offense automatically: three handlers spread for the swing, two poppers working the holes behind the cup and two wings stretching the wall. Poppers keep to their own side of the disc, slide to the windows with a clear lane from the thrower and pop up into them; wings stay wide and cut up the line, into the seam behind the wall or deep only when they have an open lane. The zone guards areas, so overloading one leaves someone open.
- **Throwing:** aim with the mouse and click. Flat throws have a little arc that grows with distance, so a long one sails over a defender in the middle of its path; only someone near the thrower or where it comes down can get a hand on it. The preview shows the flight, where it lands, and a circle for how accurate this thrower is: low throwing ratings spray it, high ones put it on a dime.
- **Their defense:** mostly person D. Defenders set up on the force side of their man (fronting him when he's close to the disc, dropping deeper when he's far out), poach the lane a little when their man is far away, and read cuts a beat late. Fast cutters can juke weak defenders, who take a few steps the wrong way; elite defenders rarely bite and stay locked on. When a cutter breaks free, a nearby teammate whose man is standing still switches onto him ("SWITCH!"). In wind and rain they're more likely to play a 3-3-1 zone: a cup of three around the thrower (only the marker within ten feet), a wall of three middles playing the lanes in front of whoever is in their area, and a deep behind everyone. The banner and the stall box tell you when it's a zone.
- **Position decides catches:** if the receiver is between the disc and their defender, it's a catch; if the defender is between the disc and the receiver, it's usually a D; on hucks, whoever is under it wins. Good hands or good defense can still steal one from a bad spot. Defenders front their man, and the ring under each receiver predicts the race if you threw it now: green, yellow or red.
- **Star ratings:** most players are 1–3 stars, good programs have a few 4-star players, and 5-star players are rare (about two in the whole league).
- **Head coach (main mode):** run a whole program, Retro Bowl style, for as many seasons as you like. Every player earns his own skill points by playing (points played, goals, assists, blocks, catches, wins), and you decide how to spend each player's points on his ratings, up to his ceiling. Wins also earn coaching credits (CC) for facilities (training center, conditioning, recruiting network) and for signing recruits each offseason when your seniors graduate. You set the O-line and D-line that every line call starts from. You can rename any of your players from his player screen. Every player keeps lifetime stats (games, points played, goals, assists, blocks, completions, turnovers, titles and honors like Team MVP and Defensive Player of the Year). When seniors graduate, the best careers go into the program's Hall of Fame, which also lists the all-time leaders.
- **Career mode** (playing as one player for four years) is archived in `archive/career-mode/`, with notes on how to add it back.

The schools are real and wear their actual school colors. Every player is generated and fictional, with names drawn from about 18,000 first/last combinations suited to the open division.

## Controls (laptop)
| Input | Action |
| --- | --- |
| Mouse | Aim |
| Click | Flat throw |
| Shift+click (or right-click) | Huck |
| Q / E | Curve the next throw left or right (press again for straight; resets after each throw). It still lands where you aim; bending around the mark makes a point-block much less likely, but the throw is a bit slower and less accurate |
| Space | Pivot fake, which opens the mark briefly |
| T | Timeout (two per game) |
| Esc / P | Pause |
| M | Mute |
| Enter, 1, 2 | Menu shortcuts and defense calls |
