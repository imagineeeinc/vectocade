import './asm';
import './controls';
import './display';
import './flopy';
import './resources';
import './sound';

/*
How does safe On The Fly Exec work?
It takes the current date, encrypts it and saves it.
You provide this key, it decrypts it, checks it and them executes the code.
If it is a key that was diposed one second ago, it is still executed. Any older and not.
Keys are refreshed every 300 frames (10s in optimal conditions where each frame is drawn 0.03s apart).
*/