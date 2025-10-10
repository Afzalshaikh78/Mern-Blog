import Subscriber from "../models/Subscriber.js";
import transporter from "../utils/sendEmail.js";

// 1. Subscribe user
export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    // check if already subscribed
    const exists = await Subscriber.findOne({ email });

    if (exists) return res.json({ message: "Already subscribed" });

    await Subscriber.create({ email });

    // send welcome mail
    // await sendEmail({
    //   to: email,
    //   subject: "🎉 Thanks for subscribing!",
    //   html: `<h2>Welcome to our Blog!</h2>
    //          <p>You’ll get notified when we publish new posts.</p>`,
    // });

    // res.json({ message: "Subscribed successfully" });
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome",
      html: `<h2>Welcome to our Blog!</h2>
              <p>You’ll get notified when we publish new posts.</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Subscribed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const notifySubscribers = async (blog) => {
  console.log("🚀 notifySubscribers function called with blog:", blog.title);

  try {
    // First, check if we have subscribers
    const subscribers = await Subscriber.find();
    console.log(`📊 Found ${subscribers.length} subscribers in database`);

    if (!subscribers.length) {
      console.log("📭 No subscribers found - exiting early");
      return;
    }

    // Log first few subscriber emails (for debugging)
    console.log(
      "👥 First few subscribers:",
      subscribers.slice(0, 3).map((s) => s.email)
    );

    const subject = `📰 New Blog: ${blog.title}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">${blog.title}</h2>
        ${blog.subTitle ? `<h3 style="color: #666;">${blog.subTitle}</h3>` : ""}
        
        <img src="${blog.image}" alt="${
      blog.title
    }" style="width: 100%; max-width: 500px; height: auto; border-radius: 8px; margin-bottom: 15px;">
        
        <p style="color: #666; line-height: 1.6;">
          ${blog.description.slice(0, 200)}${
      blog.description.length > 200 ? "..." : ""
    }
        </p>
      
      // <div style="text-align: center; margin: 30px 0;">
      //   <a href="${process.env.FRONTEND_URL}/blog/${blog._id}" 
      //       style="display: inline-block; background: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px;">
      //     Read Full Article
      //   </a>
      // </div>
        
        <p style="font-size: 12px; color: #999;">
          Category: ${blog.category} | You're subscribed to our blog updates.
        </p>
      </div>
    `;

    console.log("📧 Email template prepared, starting to send emails...");
    console.log("🌐 FRONTEND_URL:", process.env.FRONTEND_URL);
    console.log("📨 SENDER_EMAIL:", process.env.SENDER_EMAIL);

    let successCount = 0;
    let errorCount = 0;

    // Send to first subscriber as a test
    if (subscribers.length > 0) {
      const testSubscriber = subscribers[0];
      console.log(`🧪 Testing email send to: ${testSubscriber.email}`);

      try {
        const result = await transporter.sendMail({
          from: process.env.SENDER_EMAIL,
          to: testSubscriber.email,
          subject,
          html,
        });
        console.log(
          `✅ Test email sent successfully to ${testSubscriber.email}`
        );
        console.log("📄 Email result:", result);
        successCount++;
      } catch (error) {
        console.error(
          `❌ Test email failed to ${testSubscriber.email}:`,
          error
        );
        errorCount++;
      }
    }

    // Send to remaining subscribers (comment this out for initial testing)
    /*
    for (let i = 1; i < subscribers.length; i++) {
      const subscriber = subscribers[i];
      try {
        await transporter.sendMail({
          from: process.env.SENDER_EMAIL,
          to: subscriber.email,
          subject,
          html,
        });
        successCount++;
        console.log(`✅ Email sent to ${subscriber.email}`);
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        errorCount++;
        console.error(`❌ Failed to send to ${subscriber.email}:`, error.message);
      }
    }
    */

    console.log(`📊 Final Summary: ${successCount} sent, ${errorCount} failed`);
  } catch (err) {
    console.error("💥 Critical error in notifySubscribers:", err);
    console.error("Stack trace:", err.stack);
  }
};
