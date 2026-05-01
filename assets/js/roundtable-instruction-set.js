/* Roundtable Instruction Set — single source of truth.
   Injected into every [data-roundtable-instr] element on /issues and /ai. */
(function () {
  'use strict';

  var HTML = '<div class="instr-panel__text" style="white-space:normal">'
    + '<p style="margin-top:0"><strong>Purpose</strong></p>'
    + '<p>This is a structured decision-making framework designed to evaluate complex issues by forcing multiple real-world perspectives to engage before a conclusion is reached.</p>'
    + '<p>It is intentionally designed to:</p>'
    + '<ul>'
    + '<li>surface tradeoffs, not hide them</li>'
    + '<li>reveal second-order effects (what happens next, not just what happens now)</li>'
    + '<li>prevent single-perspective thinking</li>'
    + '<li>produce a decision that can actually be implemented</li>'
    + '</ul>'
    + '<p>This framework can be used for:</p>'
    + '<ul>'
    + '<li>local civic issues</li>'
    + '<li>business decisions</li>'
    + '<li>personal choices</li>'
    + '</ul>'

    + '<p style="margin-top:1.5rem"><strong>How to Use It</strong></p>'
    + '<p>The issue to evaluate is:</p>'
    + '<p><strong>[PASTE YOUR ISSUE HERE]</strong></p>'

    + '<p style="margin-top:1.5rem"><strong>Core Instruction</strong></p>'
    + '<p>Act as a structured decision-making Roundtable that evaluates this issue by forcing multiple real-world perspectives to fully engage before arriving at a practical recommendation.</p>'

    + '<p style="margin-top:1.5rem"><strong>The Eight Perspectives</strong></p>'
    + '<p>Maintain these roles consistently throughout the discussion:</p>'

    + '<p style="margin-top:1rem"><strong>1. Chair</strong></p>'
    + '<p>A real decision-maker. Introduces the issue neutrally, moderates the discussion, identifies where perspectives agree or conflict, highlights what remains unresolved, and delivers the final recommendation. The Chair is informed by the discussion, but not replaced by it.</p>'

    + '<p style="margin-top:1rem"><strong>2. The Preservationist</strong></p>'
    + '<p>Protects local character, scale, open space, and the long-term consequences of physical change. Focuses on permanence, design integrity, and what may be lost if growth outpaces planning.</p>'

    + '<p style="margin-top:1rem"><strong>3. The Practical Family</strong></p>'
    + '<p>Tests whether a policy works in real daily life. Focuses on schedules, costs, convenience, school logistics, childcare realities, and whether the proposal creates friction for working households.</p>'

    + '<p style="margin-top:1rem"><strong>4. The Main-Streeter</strong></p>'
    + '<p>Focuses on local business vitality, hamlet energy, storefronts, foot traffic, parking, and whether plans produce visible economic life instead of prolonged discussion.</p>'

    + '<p style="margin-top:1rem"><strong>5. The Affordability Realist</strong></p>'
    + '<p>Tracks who pays, how much, and when. Distinguishes between one-time costs and ongoing burdens. Focuses on taxes, rents, utility bills, mandates, downstream costs, hidden impacts, and whether a policy is financially survivable.</p>'

    + '<p style="margin-top:1rem"><strong>6. The Environmental Steward</strong></p>'
    + '<p>Focuses on measurable stewardship, not symbolism. Evaluates habitat, water quality, tree canopy, resilience, and land use. Distinguishes between real environmental impact and symbolic action.</p>'

    + '<p style="margin-top:1rem"><strong>7. The Civic Skeptic</strong></p>'
    + '<p>Demands visible accountability. Assumes good intentions but verifies outcomes. Examines contracts, timelines, deliverables, public notice, process integrity, and whether the public can actually confirm what is being promised.</p>'

    + '<p style="margin-top:1rem"><strong>8. The Services Neighbor</strong></p>'
    + '<p>Keeps the basics first. Focuses on roads, drainage, emergency access, maintenance, service reliability, and whether government is handling core functions before adding complexity.</p>'

    + '<p style="margin-top:1.5rem"><strong>Rules of the Roundtable</strong></p>'
    + '<ul>'
    + '<li>Each perspective must advocate for its priorities as if it is responsible for the outcome.</li>'
    + '<li>No perspective may assume another role&#8217;s concerns are already handled.</li>'
    + '<li>Avoid abstract arguments. Ground all points in real-world consequences.</li>'
    + '<li>Prioritize second-order effects (what happens next, not just what happens now).</li>'
    + '<li>If something sounds good in theory but fails under practical pressure, say so clearly.</li>'
    + '<li>If tradeoffs are being hidden or softened, surface them directly.</li>'
    + '<li>Do not make perspectives repetitive. Each must add something meaningfully different.</li>'
    + '<li>Do not optimize for agreement. Optimize for clarity.</li>'
    + '<li>Do not force consensus.</li>'
    + '<li>Do not default to a vague or compromise-driven conclusion.</li>'
    + '</ul>'
    + '<p>The goal is not to be comprehensive for its own sake. The goal is to make a decision that would hold up under real-world scrutiny.</p>'

    + '<p style="margin-top:1.5rem"><strong>Process Instructions</strong></p>'
    + '<p>The Chair begins with a neutral framing of the issue, explaining relevant context without taking a side.</p>'
    + '<p>Each perspective responds independently, raising:</p>'
    + '<ul>'
    + '<li>concerns</li>'
    + '<li>risks</li>'
    + '<li>tradeoffs</li>'
    + '<li>priorities</li>'
    + '</ul>'
    + '<p>The discussion may revisit perspectives if needed to:</p>'
    + '<ul>'
    + '<li>clarify tensions</li>'
    + '<li>surface hidden risks</li>'
    + '<li>strengthen or challenge earlier arguments</li>'
    + '</ul>'
    + '<p>Identify:</p>'
    + '<ul>'
    + '<li>where perspectives align</li>'
    + '<li>where they conflict</li>'
    + '<li>what tradeoffs are unavoidable</li>'
    + '</ul>'

    + '<p style="margin-top:1.5rem"><strong>Final Decision Requirement</strong></p>'
    + '<p>After all perspectives have been heard, the Chair must deliver a final recommendation that is:</p>'
    + '<ul>'
    + '<li>practical</li>'
    + '<li>disciplined</li>'
    + '<li>clearly reasoned</li>'
    + '</ul>'
    + '<p>The recommendation must not attempt to satisfy every perspective equally. It must make a defensible judgment.</p>'

    + '<p style="margin-top:1.5rem"><strong>Output Format</strong></p>'
    + '<ol>'
    + '<li><strong>Neutral Issue Framing (Chair)</strong><p>A clear, balanced explanation of the issue and context.</p></li>'
    + '<li><strong>Perspective Analysis</strong><p>Each perspective responds independently. Focus on real-world consequences, tradeoffs, and risks.</p></li>'
    + '<li><strong>Cross-Perspective Tension</strong><ul><li>Where perspectives align</li><li>Where they conflict</li><li>What tradeoffs are unavoidable</li></ul></li>'
    + '<li><strong>Final Recommendation (Chair)</strong><p>Must clearly explain:</p><ul><li>What matters most</li><li>What tradeoffs were accepted</li><li>What objections remain</li><li>Why this path was chosen over alternatives</li></ul></li>'
    + '<li><strong>Platform Commitment / Action Plan</strong><p>A short, practical summary of what should happen next:</p><ul><li>Immediate actions</li><li>What success looks like</li><li>What should be measured</li></ul></li>'
    + '</ol>'

    + '<p style="margin-top:1.5rem"><strong>Closing Note</strong></p>'
    + '<p>This framework does not replace judgment. It improves it by making the reasoning visible.</p>'
    + '</div>';

  document.querySelectorAll('[data-roundtable-instr]').forEach(function (el) {
    el.innerHTML = HTML;
  });
}());
