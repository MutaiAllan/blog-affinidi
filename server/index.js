//  1. Import required Libraries
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const { Issuer, Strategy } = require('openid-client');
const { affinidiProvider } = require('@affinidi/passport-affinidi')
const http = require("http");
require("dotenv").config();

//  2. Create an express application and setup session
const app = express();
app.use(session({
    secret: 'my-secret',
    resave: false ,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  // Check if 'page_views' is not in session
  if (!req.session.page_views) {
      req.session.page_views = 0; // Initialize 'page_views' to 0
  }
  next(); // Call the next middleware function in the stack
});

// 3. Define application end-points
// app.get("/", (req, res) => {
//     res.send(" Login to view more articles <br/><br/><a href='/login'> Affinidi Login</a>");
// })

articles = [
  {
      "author": "Glenn Griffin",
      "content": "Establish garden concern pay government moment. Woman eight pretty point nation. Simple father water option against box. Whatever increase poor however ask real top store. Defense economy myself agent theory Democrat. Near deep through expert region. Example difference per court war throw. Information maintain shake security. Before single similar suggest some Congress. Organization similar always million hour.",
      "date": "2024-02-11 17:50:36",
      "id": 1,
      "minutes_to_read": 16,
      "preview": "Establish garden concern ...",
      "title": "Might available but determine.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Gabriel Hernandez",
      "content": "Yeah even choose impact girl writer occur. Particular pattern perform car. Modern result somebody PM east. Foot door chair key finally recent occur. Nice house consider body road. Professional support subject him show. Total boy during capital opportunity. Head little affect standard single. None join think wear support share.",
      "date": "2024-02-11 17:50:36",
      "id": 2,
      "minutes_to_read": 14,
      "preview": "Yeah even choose impact g...",
      "title": "Take theory moment body poor purpose outside.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Monica Hoffman",
      "content": "Itself source story end hair despite water. Wonder in you four way receive audience run. On skin offer soldier player. Discussion week almost page agent. Soon some source kid. Question fast the both very yet even. Arrive behavior night eye card create I. Citizen individual professor win.",
      "date": "2024-02-11 17:50:36",
      "id": 3,
      "minutes_to_read": 17,
      "preview": "Itself source story end h...",
      "title": "Lawyer tonight nature chair.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Linda Fitzpatrick",
      "content": "Around traditional understand base. Treat husband yet discover story customer model own. People book these program. Throughout agency pattern eight. Plant account foreign significant federal ready. Social dinner traditional itself want garden politics model. Kitchen political role policy get top probably. High any ten most hold stop.",
      "date": "2024-02-11 17:50:36",
      "id": 4,
      "minutes_to_read": 10,
      "preview": "Around traditional unders...",
      "title": "Experience position price air.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Corey Martin",
      "content": "And final sometimes audience long. Tv prove yes painting practice. Relationship keep like enough evidence. Two ahead why audience. Return hear opportunity computer. Since brother turn film fund movie. Rather decide enter enjoy. Score beyond many short describe place. White interest establish thing condition no here. Free center why.",
      "date": "2024-02-11 17:50:36",
      "id": 5,
      "minutes_to_read": 20,
      "preview": "And final sometimes audie...",
      "title": "Man onto prepare size condition.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Isaac Harrison",
      "content": "Law get take include huge. Professional you ability senior act simply and. Know term majority customer. Also low morning several part. Health cause Congress. Teacher face off serve. Sit nature couple together to visit. Brother resource general exactly approach however chair. Near color current.",
      "date": "2024-02-11 17:50:36",
      "id": 6,
      "minutes_to_read": 13,
      "preview": "Law get take include huge...",
      "title": "Determine skin thing important.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Erica Wilson",
      "content": "Specific too hear away. Again tax wind defense sister south. Above pull which. Life federal rich phone pick become blue. Green water meet prepare stuff. Eye everybody return your player green. Understand hundred happy political thought. Physical plant certain quite. Court investment heavy.",
      "date": "2024-02-11 17:50:36",
      "id": 7,
      "minutes_to_read": 11,
      "preview": "Specific too hear away. A...",
      "title": "Assume choose list surface value.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Karen Gray",
      "content": "Total early hour answer young brother. You top goal tend happen final. Issue wall role. Recent tough bar firm half deal. Chair trouble wrong decade modern play dark.",
      "date": "2024-02-11 17:50:36",
      "id": 8,
      "minutes_to_read": 15,
      "preview": "Total early hour answer y...",
      "title": "College property development church to.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Ryan Allen",
      "content": "Score when indicate less sort note east majority. Tv could economic together cause. Factor be particular. One campaign cup safe several. Voice ground contain study quickly prove. Add score process at. Nearly their store interview space. Final force state whom box least. Ok wear local.",
      "date": "2024-02-11 17:50:36",
      "id": 9,
      "minutes_to_read": 11,
      "preview": "Score when indicate less ...",
      "title": "Money it knowledge common.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Nicole Evans",
      "content": "Wide medical manager out. Half could price. View simple source fact involve stage away. Whether structure federal strategy figure where administration. Score enjoy truth hot game out. Fund bring person class. Society our building central performance machine.",
      "date": "2024-02-11 17:50:36",
      "id": 10,
      "minutes_to_read": 11,
      "preview": "Wide medical manager out....",
      "title": "Cold when think score trouble our election.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Jamie Diaz",
      "content": "Politics city tend worry attack everything. Pay theory close garden ahead material yes loss. Next onto listen report. Risk peace energy size organization issue reflect. Listen expert catch operation protect. Thank experience century let pay try. Already she central mission well thousand. Sister become claim east soon perform that dark.",
      "date": "2024-02-11 17:50:36",
      "id": 11,
      "minutes_to_read": 20,
      "preview": "Politics city tend worry ...",
      "title": "Couple describe vote night arm mean.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Katherine Perez",
      "content": "Plant continue season find new. Minute blood lot term just know. Decision image above contain action. Treat two miss. Rich skin behind seem letter wrong. Draw blue nice now what according. Plan account forget market article.",
      "date": "2024-02-11 17:50:36",
      "id": 12,
      "minutes_to_read": 2,
      "preview": "Plant continue season fin...",
      "title": "Right stock success house culture only data.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Jack Frank II",
      "content": "Share subject military by himself black issue material. Interesting wait who memory whole. Later blood quality know short. Walk any media treatment especially response today. Kitchen data drive mother oil Congress. Avoid must school special. Green each act movie measure manage investment. Morning however family fill class today. Chance fish science character. On structure trip thank step.",
      "date": "2024-02-11 17:50:36",
      "id": 13,
      "minutes_to_read": 7,
      "preview": "Share subject military by...",
      "title": "Soon arrive what explain national lot.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Jerry Garcia",
      "content": "Interesting answer commercial until bag admit let. Stand garden fact full. Leg single my blue defense step question. Development way economic threat season. Firm light fund involve good life. Husband perhaps write plant phone class. Popular TV but research argue situation hand building. Behavior carry law collection be must.",
      "date": "2024-02-11 17:50:36",
      "id": 14,
      "minutes_to_read": 12,
      "preview": "Interesting answer commer...",
      "title": "Especially should stop hotel mother affect administration.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Lindsay Harris",
      "content": "Yet role happen rock. Do in that organization color form. Glass arrive site number hair. Task face property century control say yet. Site see make. North discuss return health. Money ago last yeah nation be teacher.",
      "date": "2024-02-11 17:50:36",
      "id": 15,
      "minutes_to_read": 12,
      "preview": "Yet role happen rock. Do ...",
      "title": "Sing good recent represent son field health.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Julia Lynch",
      "content": "Table be style group. Maybe crime candidate social majority area the. Determine author well Republican fill. Trade their interest left word. Present staff now. Social million sport hour force cold policy. Response outside wrong least owner moment. Quite suddenly local. May north position figure.",
      "date": "2024-02-11 17:50:36",
      "id": 16,
      "minutes_to_read": 7,
      "preview": "Table be style group. May...",
      "title": "Course without especially role rise.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Rebecca Fletcher",
      "content": "Fire show less hospital easy idea. Town perhaps development fall successful. Interest itself the entire heavy newspaper. Become themselves area first society statement. Area wrong name parent. About two baby commercial protect. End interesting while range bill deal. Order until name behavior benefit include.",
      "date": "2024-02-11 17:50:36",
      "id": 17,
      "minutes_to_read": 14,
      "preview": "Fire show less hospital e...",
      "title": "Action mention eye analysis which defense my.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Wesley Harrington",
      "content": "Up hand certainly outside democratic our save. Among kitchen minute coach give so catch. Attack management budget hard. News middle beat fire political where. Real financial understand catch audience. Writer himself summer body total require.",
      "date": "2024-02-11 17:50:36",
      "id": 18,
      "minutes_to_read": 16,
      "preview": "Up hand certainly outside...",
      "title": "Relationship inside natural red stand another environment.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Tara Torres",
      "content": "Affect final back. Debate change party. Middle rule region live else try. Reach same every defense. Thought type compare. Show appear color key kind certain minute admit. Democrat about Democrat physical necessary really brother take. Thing whether future here. Off draw after. Pattern source range best type prepare interview. Son section international information reach.",
      "date": "2024-02-11 17:50:36",
      "id": 19,
      "minutes_to_read": 2,
      "preview": "Affect final back. Debate...",
      "title": "Alone start inside action who.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Travis Holmes",
      "content": "Between rich by will wide want fight. Reach threat hard image itself series. Over than bar hour sense somebody. Similar against build discover yard then lose. View hit recognize nothing. Something name wife.",
      "date": "2024-02-11 17:50:36",
      "id": 20,
      "minutes_to_read": 8,
      "preview": "Between rich by will wide...",
      "title": "Section most college now.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Whitney Pacheco",
      "content": "Order start surface sister under. Fire there concern really few. Fly your station which. Admit hear behind five through. Total even budget soldier artist company system.",
      "date": "2024-02-11 17:50:36",
      "id": 21,
      "minutes_to_read": 5,
      "preview": "Order start surface siste...",
      "title": "Hour office month side indicate table loss.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Ricky Adams",
      "content": "Page both against someone road whom customer. Meeting skill million concern water. Song yes everybody few take day account. Knowledge give upon amount now.",
      "date": "2024-02-11 17:50:36",
      "id": 22,
      "minutes_to_read": 14,
      "preview": "Page both against someone...",
      "title": "Drive ok crime character expect suggest owner.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Candice Greer",
      "content": "Body Republican morning computer. Law building house exactly expect front. Outside exactly get success election activity. Always Republican energy. Ability line year may piece morning. Must point public left environment. Task case cut see nor marriage.",
      "date": "2024-02-11 17:50:36",
      "id": 23,
      "minutes_to_read": 20,
      "preview": "Body Republican morning c...",
      "title": "Quite have break star wife particular subject.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Bruce Lopez",
      "content": "Expect often woman Mrs. Week worry become shake ahead. Air prevent building truth. Day environmental wonder activity. Degree court best author consumer dream let. Positive bed will but key material position raise.",
      "date": "2024-02-11 17:50:36",
      "id": 24,
      "minutes_to_read": 20,
      "preview": "Expect often woman Mrs. W...",
      "title": "Quite nor despite hit maintain.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Charles Black",
      "content": "Have rest yet. Which high assume whom you indeed Mr. Entire already unit course treat heavy occur. Short learn every middle mind history modern likely. Hard yeah share any win. Executive despite other. Forward hour perform have reach floor. Agree move drive Mr citizen I.",
      "date": "2024-02-11 17:50:36",
      "id": 25,
      "minutes_to_read": 20,
      "preview": "Have rest yet. Which high...",
      "title": "No improve director subject.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Michael Medina",
      "content": "Main read walk. Available type already author responsibility forget. Decision face worry there leave. Improve at reduce system person. Consider over station wish quickly myself. Forget law drug possible increase.",
      "date": "2024-02-11 17:50:36",
      "id": 26,
      "minutes_to_read": 5,
      "preview": "Main read walk. Available...",
      "title": "Particular quickly card indeed.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Devin Gonzalez",
      "content": "Table moment blue sit lose affect land. Mind live although open nation. However Mrs son brother bar direction human. Plan party several theory big. Hotel last city save hear recent. Special name reason language leader contain produce. Affect conference nothing even. Sit present soon visit spring give. However organization life space. Federal on see Congress claim someone.",
      "date": "2024-02-11 17:50:36",
      "id": 27,
      "minutes_to_read": 8,
      "preview": "Table moment blue sit los...",
      "title": "World list hear big former particular reveal member.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Karen Webster",
      "content": "Cut appear off interview lead central. Thousand approach head. Hot fish process. Home civil war main. Detail tonight majority.",
      "date": "2024-02-11 17:50:36",
      "id": 28,
      "minutes_to_read": 5,
      "preview": "Cut appear off interview ...",
      "title": "Create practice continue thought worry if discussion.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Leon Morales",
      "content": "Traditional admit else environmental civil. Improve green environmental. Bed professional some wife system window. Reality throw spend reduce present TV. Because fly together kid. Small approach fight whether. Although thousand college bit research between. Rate out add.",
      "date": "2024-02-11 17:50:36",
      "id": 29,
      "minutes_to_read": 19,
      "preview": "Traditional admit else en...",
      "title": "Thus various manager million.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Cheryl Barnett",
      "content": "Per guess we item evidence throughout theory safe. Point magazine trial same. Trouble guess teach crime main owner develop. Successful official piece candidate. Range red environmental wife meet already push. Budget thus check center some green into. Quality speech floor.",
      "date": "2024-02-11 17:50:36",
      "id": 30,
      "minutes_to_read": 12,
      "preview": "Per guess we item evidenc...",
      "title": "Wife understand quickly against child time.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Christopher Ford",
      "content": "Series anything morning fear idea. Hit hit century day least fill general audience. Business much must dinner require kitchen. Quite happen American. Build paper speech deep effort provide. Hand early just deep.",
      "date": "2024-02-11 17:50:36",
      "id": 31,
      "minutes_to_read": 20,
      "preview": "Series anything morning f...",
      "title": "Lead hard low down.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Eric Wyatt",
      "content": "Smile watch can stand threat cell. Young new tend certain finally that. Value forward general pass shoulder south fight. Pass billion military southern. Yourself cover reality travel learn table. Order ask player never. Type major city at sit record. Team thing would security yes professional perform him. Computer note doctor player.",
      "date": "2024-02-11 17:50:36",
      "id": 32,
      "minutes_to_read": 13,
      "preview": "Smile watch can stand thr...",
      "title": "Executive cultural behavior need.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Curtis Evans",
      "content": "Only some treat green. Feel pull yet power leader. Heart rest charge. Enough seek quickly night total security. Church benefit worry happen truth. So detail on.",
      "date": "2024-02-11 17:50:36",
      "id": 33,
      "minutes_to_read": 15,
      "preview": "Only some treat green. Fe...",
      "title": "Send meet you story keep go skin.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Kristine Wilkinson",
      "content": "Glass plant specific health artist. Take environmental general. Since blue civil. Peace off able. Issue pressure Congress fear loss send purpose.",
      "date": "2024-02-11 17:50:36",
      "id": 34,
      "minutes_to_read": 16,
      "preview": "Glass plant specific heal...",
      "title": "Tonight somebody analysis process gun.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Diamond Harvey",
      "content": "Art decide dinner. Foot long figure. Report into blood majority move. Congress garden increase husband build. Thus brother win option. Take should capital name Democrat recent. Morning court front might trial person campaign. Item bit able bad.",
      "date": "2024-02-11 17:50:36",
      "id": 35,
      "minutes_to_read": 12,
      "preview": "Art decide dinner. Foot l...",
      "title": "Cost too different still.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Matthew Collins",
      "content": "Figure myself customer war group sometimes know at. Fact serve recognize specific. Truth listen coach culture. Top too drug great find. Different them trip could cover model. Eat continue avoid Republican us. Individual others challenge second. Do company require stand. Sign great although win. Day clear person build glass behind kind.",
      "date": "2024-02-11 17:50:36",
      "id": 36,
      "minutes_to_read": 17,
      "preview": "Figure myself customer wa...",
      "title": "Suffer option wait pick gun always hospital.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Alex Jones",
      "content": "Bill sense garden decision. Teach stuff protect expert full inside. Yeah peace keep world our whatever. Often exist pass. Design hair half measure likely international want. Thought give under cup four most like to. Firm prove weight window truth above to. Seven play run whose help style. Least you people dog late. Moment family different say of. Direction compare world fish leader.",
      "date": "2024-02-11 17:50:36",
      "id": 37,
      "minutes_to_read": 15,
      "preview": "Bill sense garden decisio...",
      "title": "Voice hold value impact describe large degree project.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Stacey Moore",
      "content": "Behind real hard cause million risk commercial. Site throw east against. Term trouble around. Fast into light whom view usually benefit. Game support provide card high write security. Describe agency sign really plan while.",
      "date": "2024-02-11 17:50:36",
      "id": 38,
      "minutes_to_read": 8,
      "preview": "Behind real hard cause mi...",
      "title": "Open mission eight.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Emily Williams",
      "content": "Fine different some director. Mrs to give picture speech piece. Realize ready argue friend civil. Animal during serious structure gas laugh. Skill movie clear address gas summer company. Simply six spend community kid I lot. Think use organization appear degree believe new.",
      "date": "2024-02-11 17:50:36",
      "id": 39,
      "minutes_to_read": 13,
      "preview": "Fine different some direc...",
      "title": "Good again fact bad between since.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Joy Patel",
      "content": "Their full civil including. Wide ten guy million. Movement father picture never really close. Against herself drop day next hospital voice. Discover either election hotel indeed program risk.",
      "date": "2024-02-11 17:50:36",
      "id": 40,
      "minutes_to_read": 1,
      "preview": "Their full civil includin...",
      "title": "But special month it add state professional argue.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Daniel Gutierrez",
      "content": "Range do property everybody reflect interesting professional. Of sit such up determine. Baby real debate born baby. Let drug smile about job good food. People such he ago new memory. East although pick teacher military. Television police else produce almost training seven.",
      "date": "2024-02-11 17:50:36",
      "id": 41,
      "minutes_to_read": 5,
      "preview": "Range do property everybo...",
      "title": "Design shoulder visit everything.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Sarah Gonzalez",
      "content": "Indeed sit produce bill necessary financial their. Value walk white her cold pay. Food door special attack I. Police half different almost politics. Interesting general program sure decision part capital. Then image stop fish boy now pull. Work explain fast nice evidence common just without.",
      "date": "2024-02-11 17:50:36",
      "id": 42,
      "minutes_to_read": 11,
      "preview": "Indeed sit produce bill n...",
      "title": "Myself you organization.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Brenda Garcia",
      "content": "Writer step computer serve system. Question song customer poor organization raise bar. Direction between hotel threat language. Nor miss rest. When avoid change minute structure animal believe. Among support thousand Democrat other. Section practice high election. President role right. More choose name reflect. Truth wrong almost word produce.",
      "date": "2024-02-11 17:50:36",
      "id": 43,
      "minutes_to_read": 17,
      "preview": "Writer step computer serv...",
      "title": "Development hear organization probably edge.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Jennifer Simpson",
      "content": "Prove light argue effect finish. Interesting improve glass. Country election chair energy away. Go late voice site fear. Discuss when north page our during yes. Fear source look together season. Research organization pass technology.",
      "date": "2024-02-11 17:50:36",
      "id": 44,
      "minutes_to_read": 8,
      "preview": "Prove light argue effect ...",
      "title": "Then material strong full clearly.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Daniel Alvarado",
      "content": "Military thought upon the couple from somebody. Risk first generation project financial. Establish billion serious hour field student. We lawyer from together rule important. My star hot. Life first such good. Skill six sister small week fast along. All agency still provide region federal. Pay matter require more imagine action let. Less issue sea way.",
      "date": "2024-02-11 17:50:36",
      "id": 45,
      "minutes_to_read": 5,
      "preview": "Military thought upon the...",
      "title": "Glass level wonder make.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Colin Bray",
      "content": "Up eight plant particularly response fight table. Describe national single detail. Game value myself society. Over another seem former office tough kitchen. Participant everything single season anything eye.",
      "date": "2024-02-11 17:50:36",
      "id": 46,
      "minutes_to_read": 13,
      "preview": "Up eight plant particular...",
      "title": "Another have cup identify.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Nicole Blanchard",
      "content": "Question various personal sometimes. Different pretty if teacher we if. Find her maintain nothing. Task morning billion story. Couple recently article game box.",
      "date": "2024-02-11 17:50:36",
      "id": 47,
      "minutes_to_read": 12,
      "preview": "Question various personal...",
      "title": "Career market he serve across.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Erica Cole",
      "content": "Doctor wonder child ground too yet image. Thought young until. Toward poor brother both value move. Travel various challenge report leg. Statement picture Congress participant or once it. Style almost lot within.",
      "date": "2024-02-11 17:50:36",
      "id": 48,
      "minutes_to_read": 3,
      "preview": "Doctor wonder child groun...",
      "title": "Nation night key not.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Hannah Ruiz",
      "content": "Social second party left. Interest structure million help. Sure yard record worry how. Sometimes east court window. Occur ever story live probably learn improve major. Indicate energy or event fund. Girl American perform space economy too themselves. Morning today road let or represent hundred. Southern its skin machine. Hear set paper group key blood.",
      "date": "2024-02-11 17:50:36",
      "id": 49,
      "minutes_to_read": 1,
      "preview": "Social second party left....",
      "title": "Admit key remain lose any amount per situation.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Benjamin Murray",
      "content": "Return hand policy cold spend third. Check once who attack. Reveal executive mind. Street sure hospital individual dinner stuff board. Build a name fight few behavior half sign. Success put health threat white past. Task fill data so personal toward somebody. Most television decide community performance or structure.",
      "date": "2024-02-11 17:50:36",
      "id": 50,
      "minutes_to_read": 14,
      "preview": "Return hand policy cold s...",
      "title": "Fall charge I weight will forget.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Brent Paul",
      "content": "Environmental you item success they prevent reveal. Image green treat. Behind bed concern most recently. Wrong bank different beautiful unit. Why challenge show central. Help follow choice avoid law us agreement hot. Southern month ever attention accept. According PM available front approach old. You factor attention action lay method.",
      "date": "2024-02-11 17:50:36",
      "id": 51,
      "minutes_to_read": 3,
      "preview": "Environmental you item su...",
      "title": "Record brother friend these education attention car.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Brian Woods",
      "content": "Into scene phone. Pay mention prove free. Area save lead middle. Race lead upon glass until any. Really high general white. Ever education blood hospital compare policy worker. Professor behavior report. Loss reality both need relate skin. Including yeah Congress effect.",
      "date": "2024-02-11 17:50:36",
      "id": 52,
      "minutes_to_read": 3,
      "preview": "Into scene phone. Pay men...",
      "title": "Movement true until wind least close.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Mark Smith",
      "content": "Or despite middle buy able. Impact number on live really. Environment gun thank action new social. Write surface such war simple perform since political. Leave small country trial. Water son green building firm wall father. Conference ability guy price tree. Address cover each for me.",
      "date": "2024-02-11 17:50:36",
      "id": 53,
      "minutes_to_read": 6,
      "preview": "Or despite middle buy abl...",
      "title": "Government rate section own.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Shawn Jackson",
      "content": "Grow already receive possible alone race serious. Up agency beautiful film without pretty. Tonight read voice clear ball. Tend executive stock charge half compare president. History visit matter doctor use I start. Exactly join pretty according. Theory number of strategy. Shake change difference seek.",
      "date": "2024-02-11 17:50:36",
      "id": 54,
      "minutes_to_read": 15,
      "preview": "Grow already receive poss...",
      "title": "We can bar believe agreement.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Kyle Salas",
      "content": "Reflect station community person. Shoulder add writer case. Mention hospital carry drug animal raise their. Job ten Mrs three sea evidence subject.",
      "date": "2024-02-11 17:50:36",
      "id": 55,
      "minutes_to_read": 1,
      "preview": "Reflect station community...",
      "title": "Simple I situation himself specific remain.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Theresa Wagner MD",
      "content": "Rest technology song great. Great practice area course agent agency number. Value peace lose task cold. Material authority speech focus. Focus position expert idea piece should quality.",
      "date": "2024-02-11 17:50:36",
      "id": 56,
      "minutes_to_read": 14,
      "preview": "Rest technology song grea...",
      "title": "Nor increase site item upon.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Thomas Howard DDS",
      "content": "Could discover easy believe build consider. Area room compare dog south help answer. Hear soldier or difference let see. Moment image back big challenge yet. Chair capital arrive. Effort beautiful carry high role. Positive amount reality agent whose course low team. Until production hard thank. Call sense mention foot century.",
      "date": "2024-02-11 17:50:36",
      "id": 57,
      "minutes_to_read": 1,
      "preview": "Could discover easy belie...",
      "title": "Tree particularly thus event toward compare suddenly then.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Phillip Jones",
      "content": "Congress type plan top for. Bad page window relate. On among need provide fear. Why likely eight business. Country eye south ago education require. Follow kid information gas.",
      "date": "2024-02-11 17:50:36",
      "id": 58,
      "minutes_to_read": 4,
      "preview": "Congress type plan top fo...",
      "title": "Raise tax their western they hit special.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Debra Williams",
      "content": "Already including decision language check heavy deep. Turn television religious lawyer. Such take degree old edge assume. Side in throughout us school anyone generation. Guy certain road produce how. Describe crime director cause. Spend couple day interview suffer history. Early dog artist care listen.",
      "date": "2024-02-11 17:50:36",
      "id": 59,
      "minutes_to_read": 20,
      "preview": "Already including decisio...",
      "title": "Turn continue those several.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Derek Miller",
      "content": "Small who sea skin. Newspaper old sort. Goal soon bring trouble interest maybe brother. Time give child. Radio forward carry community. Size employee responsibility anything safe art why. Wife as realize record audience trouble though within.",
      "date": "2024-02-11 17:50:36",
      "id": 60,
      "minutes_to_read": 14,
      "preview": "Small who sea skin. Newsp...",
      "title": "Research should begin trial very message growth.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Jaime Vasquez",
      "content": "Mrs until color stand far movement interview. Sit successful before community suffer rich pressure. Husband financial always end. Or interest trip truth style structure. While partner usually open notice. Decision claim one. Professional garden people author skin dream. Middle station other do measure notice.",
      "date": "2024-02-11 17:50:36",
      "id": 61,
      "minutes_to_read": 16,
      "preview": "Mrs until color stand far...",
      "title": "Shoulder politics forget.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Brandon Scott",
      "content": "Huge necessary daughter fly level church. Mission several sometimes foot lawyer. Expert building cause upon court. Fact hair which type successful much truth democratic. Because trouble quickly would loss determine action any. Become note physical note fear effect.",
      "date": "2024-02-11 17:50:36",
      "id": 62,
      "minutes_to_read": 19,
      "preview": "Huge necessary daughter f...",
      "title": "Without almost article second.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Wesley Snyder",
      "content": "Meeting offer east someone how. Rich book stand finally meet light college. Recent since hot suggest plant performance. Investment view moment charge could strong enough any. Person simple walk society idea child official. Animal recently draw chair feeling. Finish free foot defense traditional occur.",
      "date": "2024-02-11 17:50:36",
      "id": 63,
      "minutes_to_read": 6,
      "preview": "Meeting offer east someon...",
      "title": "Fund ten happen.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Zachary Day",
      "content": "Action medical simply current quite. State lawyer them somebody. Professor wind right TV measure rule economy. Public imagine financial ready up sort others. Anyone current conference sometimes none especially treat. Day paper do several society think much.",
      "date": "2024-02-11 17:50:36",
      "id": 64,
      "minutes_to_read": 20,
      "preview": "Action medical simply cur...",
      "title": "Amount door cover history continue give similar.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Samantha Wallace",
      "content": "Media range anyone laugh. Inside ten address produce. Anyone until agent. Begin this own cut discussion participant player. Player evidence matter.",
      "date": "2024-02-11 17:50:36",
      "id": 65,
      "minutes_to_read": 1,
      "preview": "Media range anyone laugh....",
      "title": "Skill compare move.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Jacqueline Watson",
      "content": "Drug amount table capital morning yard. Add crime themselves live. American into company create open why quality. Investment first who find follow. Outside result within. Leader form take total total hold. Side family need attention. Tough happen stop this dark source station action. Human loss administration century bar. Per and describe positive drive pressure stand.",
      "date": "2024-02-11 17:50:36",
      "id": 66,
      "minutes_to_read": 6,
      "preview": "Drug amount table capital...",
      "title": "Name even travel alone fly.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Pamela Wallace",
      "content": "Bring simply here how. Sing everything need event happy key. List already memory attention question. Back grow word consumer wind start. Between exactly scene history. Star management describe my modern which both. Young company notice design law well lose. Suggest leader thousand.",
      "date": "2024-02-11 17:50:36",
      "id": 67,
      "minutes_to_read": 18,
      "preview": "Bring simply here how. Si...",
      "title": "Top land product support even with medical.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Jamie Lopez",
      "content": "Get get central light. People officer science sing their. Door likely success his suffer. Computer computer standard size window charge. Plan risk weight industry daughter spring. Traditional strategy anything also newspaper return seek. Response trouble reduce two experience unit guess. Character off ten skin. To significant similar meet daughter lead despite. Strong seven three understand recognize. Hot out five major like rise.",
      "date": "2024-02-11 17:50:36",
      "id": 68,
      "minutes_to_read": 1,
      "preview": "Get get central light. Pe...",
      "title": "Discussion strategy sell.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Taylor Rowland",
      "content": "On less usually prove foreign professional scene compare. Production difficult agency theory top despite notice. Wear suffer hope lot. Light animal example too send in thank strong. Rock dream story letter treat ago cut. Minute poor condition production water skin office as. Road report figure herself team nothing face.",
      "date": "2024-02-11 17:50:36",
      "id": 69,
      "minutes_to_read": 11,
      "preview": "On less usually prove for...",
      "title": "Offer week two thank thought national recent.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Sarah Davis",
      "content": "Above player through if onto. Huge special stage outside billion recent. Economy six check contain. Down campaign company exactly. Onto but recognize them wonder. He including skill best.",
      "date": "2024-02-11 17:50:36",
      "id": 70,
      "minutes_to_read": 2,
      "preview": "Above player through if o...",
      "title": "Discuss soon character she.",
      "user": null,
      "user_id": null
  },
  {
      "author": "John Hoffman",
      "content": "Pull control always carry consumer. Ten maybe take various. Despite space process hope when southern my. Television evidence attack. Class spend increase century budget.",
      "date": "2024-02-11 17:50:36",
      "id": 71,
      "minutes_to_read": 5,
      "preview": "Pull control always carry...",
      "title": "Both cover laugh win raise degree enter.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Madison Smith",
      "content": "Chance material entire election. Begin attorney avoid film feeling population. At building do move manage far rate piece. Risk line anyone baby tonight law several. Know successful watch study issue themselves foreign different. Move education price usually enough necessary.",
      "date": "2024-02-11 17:50:36",
      "id": 72,
      "minutes_to_read": 2,
      "preview": "Chance material entire el...",
      "title": "Budget lot agree two effect goal.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Kari Stokes",
      "content": "Follow agent easy create president party knowledge. Group join affect move page arm power. Must trial current probably. Agent main until off expert style enough. By throughout color effort. Student character window hand fly. Wall avoid a.",
      "date": "2024-02-11 17:50:36",
      "id": 73,
      "minutes_to_read": 16,
      "preview": "Follow agent easy create ...",
      "title": "Perform event they expect per role.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Jesse Morrison",
      "content": "Officer method thus past best form parent. Mention over first baby it. Baby from affect huge low training others. Wait nice rich. Mission detail special imagine when south table.",
      "date": "2024-02-11 17:50:36",
      "id": 74,
      "minutes_to_read": 20,
      "preview": "Officer method thus past ...",
      "title": "Into shoulder say history although would.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Elizabeth Crosby",
      "content": "Join story far yet assume much her. Us more help third middle. Treat early street blood. Sport office continue conference often we degree ability. Store young practice particularly million from. Option certain life family. Discuss individual class yeah. Significant study modern serious Mr play audience.",
      "date": "2024-02-11 17:50:36",
      "id": 75,
      "minutes_to_read": 2,
      "preview": "Join story far yet assume...",
      "title": "Section tough half lot accept kind.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Jim Cooper",
      "content": "Find safe reflect already role edge TV. Return war national right happen. Them that scene which paper. Carry rate party senior poor very attention. Model grow well share including page less cover.",
      "date": "2024-02-11 17:50:36",
      "id": 76,
      "minutes_to_read": 1,
      "preview": "Find safe reflect already...",
      "title": "Recognize man reason eat cell enter above.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Tyler Bridges",
      "content": "Across degree speak analysis computer. Eight window help require. Treatment strong loss cover concern pressure. Science trip accept perhaps. Scene modern husband clearly court.",
      "date": "2024-02-11 17:50:36",
      "id": 77,
      "minutes_to_read": 7,
      "preview": "Across degree speak analy...",
      "title": "Activity suggest group his.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Stephanie Morris",
      "content": "Believe ok particular turn beautiful. Half at work fly occur attention view. Accept indicate two or full assume Congress. Sister year benefit finally business tonight what. Must better summer lose series hear want. Fly another anything financial Congress serious. Bring positive sort hundred federal across dream pass.",
      "date": "2024-02-11 17:50:36",
      "id": 78,
      "minutes_to_read": 5,
      "preview": "Believe ok particular tur...",
      "title": "Visit fire stay edge tonight.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Elizabeth Espinoza",
      "content": "Bad cell finish among. Knowledge receive instead successful we local. Study again dinner on scene room. Mind new a officer. Better choice guess amount generation. Produce off reach piece drug thank. Information black administration deep throw street.",
      "date": "2024-02-11 17:50:36",
      "id": 79,
      "minutes_to_read": 6,
      "preview": "Bad cell finish among. Kn...",
      "title": "Group partner like tend each sister cost.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Juan Becker",
      "content": "Long production idea. House turn nothing think spring. Military herself medical front my war thing bag. Maybe the guess shoulder big wait. Popular week standard somebody present. Reason agent throughout. View right amount however.",
      "date": "2024-02-11 17:50:36",
      "id": 80,
      "minutes_to_read": 13,
      "preview": "Long production idea. Hou...",
      "title": "Serious budget water fund.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Patrick Simpson",
      "content": "Important start stock language wind least accept. My nation produce rock author upon challenge. East southern wonder officer. Over space attorney short outside.",
      "date": "2024-02-11 17:50:36",
      "id": 81,
      "minutes_to_read": 8,
      "preview": "Important start stock lan...",
      "title": "Since she indeed.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Betty Jacobs",
      "content": "Join reveal man. Modern inside contain friend worker moment race foreign. Nation ask model. Throughout suggest total somebody talk leg visit respond. Discussion about here send morning industry then. Tonight glass agree share keep use poor. Good minute pay do a capital the.",
      "date": "2024-02-11 17:50:36",
      "id": 82,
      "minutes_to_read": 15,
      "preview": "Join reveal man. Modern i...",
      "title": "Fact well especially wish.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Ruben Jones",
      "content": "Series agent dream sign hot cover grow. Them billion remember. Increase street system around machine. Tend population several available. Response picture end environmental. Sit knowledge deal physical affect floor wide. Process clear growth fish language west. Exist lot information until. Door page pretty perform. Hotel pass civil now ready.",
      "date": "2024-02-11 17:50:36",
      "id": 83,
      "minutes_to_read": 17,
      "preview": "Series agent dream sign h...",
      "title": "Line wind control hard he most.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Benjamin Lewis",
      "content": "Dog notice trade. Art expert these top describe mention year. International plant already class send. Key both quite mean stand member organization. Modern nearly financial. Option simply firm black according. Item son remain project audience although. Color arrive scientist mother him you business. Never message front PM entire whatever many. Mouth shoulder other sure admit.",
      "date": "2024-02-11 17:50:36",
      "id": 84,
      "minutes_to_read": 13,
      "preview": "Dog notice trade. Art exp...",
      "title": "Company support child tree site industry federal what.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Michael Bray",
      "content": "Practice indicate lot blood couple say. Carry owner bed avoid picture line medical. Traditional specific any Republican character school church. Military put north man whom. Organization break professional sort important recognize. End much know form traditional. Wind yard anything single. Wonder begin her record rate discover myself movie. Sign pretty crime certainly according mean. Matter care recognize create.",
      "date": "2024-02-11 17:50:36",
      "id": 85,
      "minutes_to_read": 12,
      "preview": "Practice indicate lot blo...",
      "title": "Produce cause state.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Kelsey Olsen",
      "content": "Concern house cover skin particularly prevent. Past serious left risk year. Beat direction large our. Than toward well able. Result real beat contain artist control.",
      "date": "2024-02-11 17:50:36",
      "id": 86,
      "minutes_to_read": 1,
      "preview": "Concern house cover skin ...",
      "title": "So card today state.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Caleb Cortez",
      "content": "Bank turn outside. More program tonight respond. Kitchen far such stage every save. After sort language dream ready different manage window. Again ago least live rate rate.",
      "date": "2024-02-11 17:50:36",
      "id": 87,
      "minutes_to_read": 20,
      "preview": "Bank turn outside. More p...",
      "title": "Outside drive over understand.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Laura Ford",
      "content": "Sell race here condition training bank over. Necessary yard risk draw. Small recognize man. Expert maintain again now guy question.",
      "date": "2024-02-11 17:50:36",
      "id": 88,
      "minutes_to_read": 18,
      "preview": "Sell race here condition ...",
      "title": "Interview marriage someone list hear by society.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Ian Ramirez",
      "content": "Executive he recognize consumer network research. Perhaps still at message. A boy far population region tend. Doctor table physical raise western brother. Term hospital why learn want. Child by lay Mr million cold news. Size glass actually range.",
      "date": "2024-02-11 17:50:36",
      "id": 89,
      "minutes_to_read": 18,
      "preview": "Executive he recognize co...",
      "title": "Large table various commercial strategy fear model.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Nicole Guzman",
      "content": "Voice edge nature until sit movie. Leader brother name whose middle daughter design. Mention already themselves to fire. Consumer on start. Agency child international drop throw. Letter few right character huge paper. Question go significant edge community gas loss morning. Movie language car help cultural player actually. Kitchen face move dog say everything continue. Eight car money guy.",
      "date": "2024-02-11 17:50:36",
      "id": 90,
      "minutes_to_read": 9,
      "preview": "Voice edge nature until s...",
      "title": "Yourself same admit apply threat.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Samantha Johnson",
      "content": "President item level including. Nearly wish since news always point kitchen total. Until save particular PM political office. Why candidate hope modern low. Including minute difference better. Best too exist amount ever. Truth several see. Today individual important. I collection as national condition piece carry. Election strategy music store. List scientist hundred decision difference past.",
      "date": "2024-02-11 17:50:36",
      "id": 91,
      "minutes_to_read": 10,
      "preview": "President item level incl...",
      "title": "Amount level situation.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Isaac Jordan",
      "content": "Many national worker break yard worry. Expect arm attack represent small act avoid. Worker experience get sound contain rather. Contain someone above program performance. Pass girl easy watch hot development. Book watch worker each best serious.",
      "date": "2024-02-11 17:50:36",
      "id": 92,
      "minutes_to_read": 19,
      "preview": "Many national worker brea...",
      "title": "Full tough concern bill drug.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Chelsea Thomas",
      "content": "Similar decide set strategy discover family total person. Control foreign despite police. Sort whose cover defense character. Product sport rate coach degree security whether region. Say seem next often pattern soldier. Dark dinner over shoulder experience girl pay today. Recent occur interest upon natural get simply. Work risk important. Ask including last hear total deal save.",
      "date": "2024-02-11 17:50:36",
      "id": 93,
      "minutes_to_read": 7,
      "preview": "Similar decide set strate...",
      "title": "Fill population career meeting whatever right.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Caitlin Munoz",
      "content": "People write guess certainly model up answer quickly. Them authority different hear front evidence. Often heart although author parent. Kid month agent share popular. Type eight expert can. Big economy table method. Senior high many instead every daughter part. Trip institution issue sense. None improve none where. Level possible sort responsibility city art.",
      "date": "2024-02-11 17:50:36",
      "id": 94,
      "minutes_to_read": 10,
      "preview": "People write guess certai...",
      "title": "Very detail glass draw seem son side else.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Mason Williams",
      "content": "Building instead sea one couple. Cut national significant trial nothing actually. Couple me south meet five. Model forget join air. Tough then future hair however at.",
      "date": "2024-02-11 17:50:36",
      "id": 95,
      "minutes_to_read": 3,
      "preview": "Building instead sea one ...",
      "title": "I response teacher plant out guy return.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Gloria Middleton",
      "content": "Full always too film wear. Least sure resource wall task. Class word any especially yourself notice agency modern. Current not provide data. Feel product pressure director power.",
      "date": "2024-02-11 17:50:36",
      "id": 96,
      "minutes_to_read": 2,
      "preview": "Full always too film wear...",
      "title": "East price poor sport.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Garrett Lee",
      "content": "Soldier tough rock artist thank full improve article. Effect instead professional lead. Total about answer. Much street help behind. Physical practice focus do market hotel white. Space realize which Congress image strong pretty could. Green support now impact few. Worker fill send lot.",
      "date": "2024-02-11 17:50:36",
      "id": 97,
      "minutes_to_read": 19,
      "preview": "Soldier tough rock artist...",
      "title": "Product particular million leg identify never main.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Austin Gonzales",
      "content": "Appear purpose prove answer. Respond also man scene name. My old college wall book sea special single. Suggest start doctor prevent recognize. May amount new growth let wonder artist. Realize exist space suggest. Up employee easy page. Week sort young account blood woman red. Pick official stand each cover under add. Choose source center.",
      "date": "2024-02-11 17:50:36",
      "id": 98,
      "minutes_to_read": 16,
      "preview": "Appear purpose prove answ...",
      "title": "Billion book ago group.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Juan Weiss",
      "content": "Indicate understand citizen pattern southern power. Fear again itself health if opportunity. Bad last style daughter cup create. Rule history national material. Identify gun beyond ability early wonder. However grow movie audience whether according.",
      "date": "2024-02-11 17:50:36",
      "id": 99,
      "minutes_to_read": 11,
      "preview": "Indicate understand citiz...",
      "title": "Author respond understand recent.",
      "user": null,
      "user_id": null
  },
  {
      "author": "Lisa Brown",
      "content": "Huge peace red she try truth theory. Degree too space even can. Story few fight at less. Everyone science important own unit. Popular material star worker.",
      "date": "2024-02-11 17:50:36",
      "id": 100,
      "minutes_to_read": 9,
      "preview": "Huge peace red she try tr...",
      "title": "Push particular memory within upon carry start blood.",
      "user": null,
      "user_id": null
  }
]

const initializeServer = async () => {
// app.get('/', (req, res) => {
//   // Increment 'page_views' and send the response
//   req.session.page_views++;
//   res.send(`Page views: ${req.session.page_views}`);
// });

app.get('/', function (req, res, next) {
    res.json({ success: 'Express' });
});

await affinidiProvider(app, {
    id: "affinidi",
    issuer: process.env.AFFINIDI_ISSUER,
    client_id: process.env.AFFINIDI_CLIENT_ID,
    client_secret: process.env.AFFINIDI_CLIENT_SECRET,
    redirect_uris: ['http://localhost:3000/auth/callback']
});

app.get('/articles', (req, res) => {
  // Send the list of articles as a JSON response
  res.json(articles);
});

app.get('/articles/:id', (req, res) => {
  const id = parseInt(req.params.id); // Extract the article ID from the URL parameter

  // Find the article with the specified ID
  const article = articles.find(article => article.id === id);

  if (!article) {
      // If no article found, send a 404 Not Found response
      return res.status(404).json({ message: 'Article not found' });
  }

  // Send the article as a JSON response
  res.json(article);
});

app.get('/login',
    function (req, res, next) {
        next();
    },
    passport.authenticate('affinidi-login',{scope:'openid'})
);

app.get('/login/callback', (req, res, next) => {
    passport.authenticate('affinidi-login', {successRedirect: '/protected', failureRedirect: '/'})(req,res,next)
})

app.get("/protected", (req, res) => {
    res.header("Content-Type", 'application/json');
    res.end(JSON.stringify(req.user, null, 4));
})

const httpServer = http.createServer(app)
httpServer.listen(8080, () => {
    console.log(`Hello World - Affinidi Login : Up and running on 8080`)
})

// 5. Integrate Authentication
// 5a. Discover Affinidi Login - Issuer
Issuer.discover(process.env.AFFINIDI_ISSUER).then(function (oidcIssuer) {
    // 5b. Create a RP-client which can initiate an OIDC flow
    var client = new oidcIssuer.Client({
      client_id: process.env.AFFINIDI_CLIENT_ID,
      client_secret: process.env.AFFINIDI_CLIENT_SECRET,
      redirect_uris: ["http://localhost:8080/login/callback"],
      response_types: ['code'],
      token_endpoint_auth_method: 'client_secret_post'
    });

    // 5c. Provide this strategy to the passport middleware
    passport.use(
      'affinidi-login', new Strategy({ client, passReqToCallback: true }, (req, tokenSet, userinfo, done) => {
        req.session.tokenSet = tokenSet;
        req.session.userinfo = userinfo;
        return done(null, tokenSet.claims());
      }));
  });

  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

}

initializeServer();