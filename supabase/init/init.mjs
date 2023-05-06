import dotenv from "dotenv";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const init = async () => {
  try {
    await CreateUsers();
    await UploadIcon();
    await InsertGuest();
    await UploadGuestIcon();
    await InsertEvent();
    await UploadEventImage();
    await InsertEventOrganizer();
    await InsertEventDJ();
    await InsertEventVJ();
    await InsertEventGuestDJ();
    await InsertTicket();
  } catch (error) {
    console.error(error);
  }
};

const CreateUsers = async () => {
  const authjson = await fs.promises.readFile("./data/auth.json", "utf8");
  const profilejson = await fs.promises.readFile("./data/profile.json", "utf8");
  let authdata = JSON.parse(authjson);
  let profiledata = JSON.parse(profilejson);

  for (let i = 0; i < 5; i++) {
    const { data, autherr } = await supabase.auth.signUp(authdata[i]);
    if (autherr) throw autherr;
    if (data) profiledata[i]["uuid"] = data.user.id;
    const { dberr } = await supabase.from("profile").insert(profiledata[i]);
    if (dberr) throw dberr;
  }

  console.log("Successfully created profile!");
};

const UploadIcon = async () => {
  const profilejson = await fs.promises.readFile("./data/profile.json", "utf8");
  let profiledata = JSON.parse(profilejson);

  for (let i = 0; i < 5; i++) {
    const path = "./data/icon" + i + ".png";
    const icon = await fs.readFileSync(path);
    const { data, error } = await supabase.storage
      .from("profile")
      .upload(profiledata[i].id + ".png", icon, {
        contentType: "image/png",
      });
    if (error) throw error;
  }

  console.log("Successfully upload icon image!");
};

const InsertGuest = async () => {
  const guestjson = await fs.promises.readFile("./data/guest.json", "utf8");
  const guestdata = JSON.parse(guestjson);
  const { error } = await supabase.from("guest").insert(guestdata);
  if (error) throw error;
  console.log("Successfully inserted guest data!");
};

const UploadGuestIcon = async () => {
  const guestjson = await fs.promises.readFile("./data/guest.json", "utf8");
  let guestdata = JSON.parse(guestjson);

  for (let i = 0; i < 3; i++) {
    const path = "./data/guest" + i + ".png";
    const icon = await fs.readFileSync(path);
    const { data, error } = await supabase.storage
      .from("guest")
      .upload(guestdata[i].id + ".png", icon, {
        contentType: "image/png",
      });
    if (error) throw error;
  }

  console.log("Successfully upload guest icon image!");
};

const InsertEvent = async () => {
  const eventjson = await fs.promises.readFile("./data/event.json", "utf8");
  const eventdata = JSON.parse(eventjson);
  const { error } = await supabase.from("event").insert(eventdata);
  if (error) throw error;
  console.log("Successfully inserted event data!");
};

const UploadEventImage = async () => {
  const eventjson = await fs.promises.readFile("./data/event.json", "utf8");
  let eventdata = JSON.parse(eventjson);
  const event_image = await fs.readFileSync("./data/event.png");

  for (let i = 0; i < 3; i++) {
    const { data, error } = await supabase.storage
      .from("event")
      .upload(eventdata[i].id + ".png", event_image, {
        contentType: "image/png",
      });
    if (error) throw error;
  }

  console.log("Successfully upload event image!");
};

const InsertTicket = async () => {
  const ticketjson = await fs.promises.readFile("./data/ticket.json", "utf8");
  const ticketdata = JSON.parse(ticketjson);
  const { error } = await supabase.from("ticket").insert(ticketdata);
  if (error) throw error;
  console.log("Successfully inserted ticket data!");
};

const InsertEventOrganizer = async () => {
  const json = await fs.promises.readFile("./data/event_organizer.json", "utf8");
  const input = JSON.parse(json);
  const { error } = await supabase.from("event_organizer").insert(input);
  if (error) throw error;
  console.log("Successfully inserted event_organizer data!");
};

const InsertEventDJ = async () => {
  const json = await fs.promises.readFile("./data/event_dj.json", "utf8");
  const input = JSON.parse(json);
  const { error } = await supabase.from("event_dj").insert(input);
  if (error) throw error;
  console.log("Successfully inserted event_dj data!");
};

const InsertEventVJ = async () => {
  const json = await fs.promises.readFile("./data/event_vj.json", "utf8");
  const input = JSON.parse(json);
  const { error } = await supabase.from("event_vj").insert(input);
  if (error) throw error;
  console.log("Successfully inserted event_vj data!");
};

const InsertEventGuestDJ = async () => {
  const json = await fs.promises.readFile("./data/event_guestdj.json", "utf8");
  const input = JSON.parse(json);
  const { error } = await supabase.from("event_guestdj").insert(input);
  if (error) throw error;
  console.log("Successfully inserted event_guestdj data!");
};

init();
