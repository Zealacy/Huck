# Huck

**Pacific Huck** is a retro arcade game about West Coast high school ultimate frisbee.

Open `index.html` in a browser to play. It's a single file with no build step. `src/pacific-huck.html` is the same game without the HTML wrapper, used for publishing.

## Modes
- **Quick game:** pick any two of 17 real high school programs from Washington, Oregon and California and play to 7.
- **Rosters and subs:** every team carries 14 players. Before each point you call a line of seven (O-line, D-line, freshest legs or your own picks), or let the coach do it. Players tire the more points they play and recover on the sideline. Subs only happen between points, except for injury subs after layouts and sky battles. Each team gets two timeouts.
- **Offense:** by default (Auto) your cutters run a vertical stack with real discipline: the front of the stack cuts under, the back goes deep, and each cutter jab-steps, cuts, then clears out and rejoins at the back. The next cutter goes as soon as the one ahead has made his cut, with never more than two in the lane.
- **Playbook:** before an O-line point you can call a play (press 1 to 6 on the line call, 0 for Auto). A play sets the starting formation (vertical stack, horizontal stack, 2-3, 3-2, 1-4, 4-1 or your own custom layout with 2 or 3 handlers) and a scripted sequence of cuts: who cuts, under or deep (or swing/dump for handlers), to the live or dead side, and how long after the cut before it. Formations are saved as disc side and far side, so they flip to fit whichever side the disc starts on. The play runs until the stall hits 6, someone new catches it, or you throw; then the team goes back to the regular stack. A play never guarantees an open look. In head coach mode, open Playbook from the hub or the lines editor to build up to 6 plays: drag the dots, change roles, edit the cut list and press Test to watch it. Quick games use your saved playbook (or the 5 default plays).
- **Throwing:** aim with the mouse and click. The preview shows the flight, where it lands, and a circle for how accurate this thrower is: low throwing ratings spray it, high ones put it on a dime.
- **Position decides catches:** if the receiver is between the disc and their defender, it's a catch; if the defender is between the disc and the receiver, it's usually a D; on hucks, whoever is under it wins. Good hands or good defense can still steal one from a bad spot. Defenders front their man, and the ring under each receiver predicts the race if you threw it now: green, yellow or red.
- **Star ratings:** most players are 1–3 stars, good programs have a few 4-star players, and 5-star players are rare (about two in the whole league).
- **Head coach (main mode):** run a whole program, Retro Bowl style, for as many seasons as you like. Every player earns his own skill points by playing (points played, goals, assists, blocks, catches, wins), and you decide how to spend each player's points on his ratings, up to his ceiling. Wins also earn coaching credits (CC) for facilities (training center, conditioning, recruiting network) and for signing recruits each offseason when your seniors graduate. You set the O-line and D-line that every line call starts from. You can rename any of your players from his player screen.
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
| 0 to 6 (O-line call) | Call a play: 0 is Auto, 1 to 6 are your playbook |
