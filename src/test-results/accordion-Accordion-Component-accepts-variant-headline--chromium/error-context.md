# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accordion.spec.ts >> Accordion Component >> accepts variant="headline"
- Location: tests\e2e\accordion.spec.ts:94:5

# Error details

```
Error: page.evaluate: Execution context was destroyed, most likely because of a navigation
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - img [ref=e6] [cursor=pointer]
    - generic [ref=e8]:
      - generic [ref=e11] [cursor=pointer]: A
      - tree [ref=e12]:
        - treeitem [ref=e13] [cursor=pointer]:
          - img [ref=e19]
        - treeitem [ref=e23] [cursor=pointer]:
          - img [ref=e29]
        - treeitem [ref=e33] [cursor=pointer]:
          - img [ref=e39]
        - treeitem [ref=e41] [cursor=pointer]:
          - img [ref=e47]
        - treeitem "✨" [ref=e50] [cursor=pointer]:
          - generic [ref=e51]:
            - img [ref=e56]
            - generic [ref=e60]: ✨
        - treeitem [ref=e61] [cursor=pointer]:
          - img [ref=e67]
        - treeitem [ref=e73] [cursor=pointer]:
          - img [ref=e79]
      - tree [ref=e82]:
        - treeitem "Foundation & Layout" [ref=e83] [cursor=pointer]:
          - img [ref=e89]
        - treeitem "Navigation" [ref=e94] [cursor=pointer]:
          - img [ref=e100]
        - treeitem "Inputs & Forms" [ref=e102] [cursor=pointer]:
          - img [ref=e108]
        - treeitem "Data Visualization" [ref=e110] [cursor=pointer]:
          - img [ref=e116]
        - treeitem "Display" [ref=e120] [cursor=pointer]:
          - img [ref=e126]
        - treeitem "Feedback & Overlays" [ref=e128] [cursor=pointer]:
          - img [ref=e134]
        - treeitem "Charts" [ref=e136] [cursor=pointer]:
          - img [ref=e142]
        - treeitem "Mega Menu (50 Items)" [ref=e143] [cursor=pointer]:
          - img [ref=e149]
      - tree [ref=e153]:
        - treeitem "New" [ref=e154] [cursor=pointer]:
          - generic [ref=e155]:
            - img [ref=e160]
            - generic [ref=e165]: New
        - treeitem "1" [ref=e166] [cursor=pointer]:
          - generic [ref=e167]:
            - img [ref=e172]
            - generic [ref=e175]: "1"
      - tree [ref=e176]:
        - treeitem "Praveen Rajkumar" [ref=e177] [cursor=pointer]:
          - img [ref=e183]
  - main [ref=e187]:
    - generic [ref=e188]:
      - generic [ref=e189]:
        - button [ref=e191] [cursor=pointer]:
          - img [ref=e197]
        - img [ref=e203]
        - generic [ref=e205]: Components
        - img [ref=e209]
        - generic [ref=e211]: Accordion
      - generic "Switch to dark mode" [ref=e212] [cursor=pointer]:
        - button [ref=e213]:
          - img [ref=e219]
    - generic [ref=e237]:
      - generic [ref=e238]:
        - generic [ref=e240]:
          - generic [ref=e243]: <ui-accordion>
          - heading "Accordion" [level=1] [ref=e244]
        - paragraph [ref=e245]: A vertically stacked set of interactive headings that each reveal an associated section of content.
        - generic [ref=e246]:
          - button "Design Studio" [ref=e247] [cursor=pointer]:
            - img [ref=e251]
            - text: Design Studio
          - button "Documentation" [ref=e252] [cursor=pointer]:
            - img [ref=e256]
            - text: Documentation
          - button "Examples & Demos" [ref=e258] [cursor=pointer]:
            - img [ref=e262]
            - text: Examples & Demos
      - generic [ref=e267]:
        - generic [ref=e268]:
          - generic [ref=e269]:
            - generic [ref=e270]: Live Preview
            - generic "Copy code" [ref=e272]:
              - button "Copy Code" [ref=e273] [cursor=pointer]:
                - generic [ref=e275]:
                  - img [ref=e281]
                  - generic [ref=e285]:
                    - generic: Copy Code
          - tablist [ref=e289]:
            - generic [ref=e290]:
              - heading "Open Item 1" [level=3] [ref=e291]:
                - button "Open Item 1" [ref=e293] [cursor=pointer]:
                  - generic [ref=e298]:
                    - generic [ref=e302]: Item 1
                    - generic [ref=e303]:
                      - generic:
                        - generic:
                          - generic:
                            - img
              - region:
                - generic [ref=e304]: Content for item 1
            - generic [ref=e305]:
              - heading "Open Item 2" [level=3] [ref=e306]:
                - button "Open Item 2" [ref=e308] [cursor=pointer]:
                  - generic [ref=e313]:
                    - generic [ref=e317]: Item 2
                    - generic [ref=e318]:
                      - generic:
                        - generic:
                          - generic:
                            - img
              - region:
                - generic [ref=e319]: Content for item 2
          - generic [ref=e321]:
            - generic [ref=e322]:
              - generic [ref=e323]: HTML
              - button "Copy" [ref=e325] [cursor=pointer]:
                - generic [ref=e327]:
                  - img [ref=e333]
                  - generic [ref=e337]:
                    - generic: Copy
            - code [ref=e339]: "<ui-accordion items=\"[{&quot;id&quot;:&quot;1&quot;,&quot;title&quot;:&quot;Item 1&quot;,&quot;content&quot;:&quot;Content for item 1&quot;},{&quot;id&quot;:&quot;2&quot;,&quot;title&quot;:&quot;Item 2&quot;,&quot;content&quot;:&quot;Content for item 2&quot;}]\"></ui-accordion>"
        - generic [ref=e340]:
          - generic [ref=e341]:
            - img [ref=e345]
            - generic [ref=e348]: Properties
          - tablist [ref=e351]:
            - generic [ref=e352]:
              - heading "Open State & Behaviors (35)" [level=3] [ref=e353]:
                - button "Open State & Behaviors (35)" [ref=e355] [cursor=pointer]:
                  - generic [ref=e360]:
                    - generic [ref=e364]: State & Behaviors (35)
                    - generic [ref=e365]:
                      - generic:
                        - generic:
                          - generic:
                            - img
              - region:
                - generic [ref=e367]:
                  - generic [ref=e368]:
                    - generic [ref=e369]:
                      - generic [ref=e370]: autoScroll
                      - generic "Automatically scroll the item into view when it is opened if it's partially off-screen" [ref=e371]: "?"
                    - generic [ref=e374] [cursor=pointer]:
                      - checkbox "false" [ref=e376]
                      - generic [ref=e379]: "false"
                  - generic [ref=e380]:
                    - generic [ref=e381]:
                      - generic [ref=e382]: dense
                      - generic "Compact/dense mode" [ref=e383]: "?"
                    - generic [ref=e386] [cursor=pointer]:
                      - checkbox "false" [ref=e388]
                      - generic [ref=e391]: "false"
                  - generic [ref=e392]:
                    - generic [ref=e393]:
                      - generic [ref=e394]: disabled
                      - generic "Disable the entire accordion" [ref=e395]: "?"
                    - generic [ref=e398] [cursor=pointer]:
                      - checkbox "false" [ref=e400]
                      - generic [ref=e403]: "false"
                  - generic [ref=e404]:
                    - generic [ref=e405]:
                      - generic [ref=e406]: enableAISummaries
                      - generic "Enable AI-generated content briefing tooltips on hover" [ref=e407]: "?"
                    - generic [ref=e410] [cursor=pointer]:
                      - checkbox "false" [ref=e412]
                      - generic [ref=e415]: "false"
                  - generic [ref=e416]:
                    - generic [ref=e417]:
                      - generic [ref=e418]: enableAnimation
                      - generic "Enable global animations" [ref=e419]: "?"
                    - generic [ref=e422] [cursor=pointer]:
                      - checkbox "true" [checked] [ref=e424]
                      - generic [ref=e427]: "true"
                  - generic [ref=e428]:
                    - generic [ref=e429]:
                      - generic [ref=e430]: enableCollaborators
                      - generic "Enable real-time collaborator presence indicators in headers" [ref=e431]: "?"
                    - generic [ref=e434] [cursor=pointer]:
                      - checkbox "false" [ref=e436]
                      - generic [ref=e439]: "false"
                  - generic [ref=e440]:
                    - generic [ref=e441]:
                      - generic [ref=e442]: enableDragDrop
                      - generic "Enable drag & drop reordering" [ref=e443]: "?"
                    - generic [ref=e446] [cursor=pointer]:
                      - checkbox "false" [ref=e448]
                      - generic [ref=e451]: "false"
                  - generic [ref=e452]:
                    - generic [ref=e453]:
                      - generic [ref=e454]: enableExpandCollapseAll
                      - generic "Show expand/collapse all buttons" [ref=e455]: "?"
                    - generic [ref=e458] [cursor=pointer]:
                      - checkbox "false" [ref=e460]
                      - generic [ref=e463]: "false"
                  - generic [ref=e464]:
                    - generic [ref=e465]:
                      - generic [ref=e466]: enableGestures
                      - generic "Enable tactile swipe gestures for item actions (Mobile Context)" [ref=e467]: "?"
                    - generic [ref=e470] [cursor=pointer]:
                      - checkbox "false" [ref=e472]
                      - generic [ref=e475]: "false"
                  - generic [ref=e476]:
                    - generic [ref=e477]:
                      - generic [ref=e478]: enableHaptics
                      - generic "Enable auditory haptics (premium click/collapse sounds)" [ref=e479]: "?"
                    - generic [ref=e482] [cursor=pointer]:
                      - checkbox "false" [ref=e484]
                      - generic [ref=e487]: "false"
                  - generic [ref=e488]:
                    - generic [ref=e489]:
                      - generic [ref=e490]: enableHolographic
                      - generic "Enable Advanced 3D 'Holographic' depth stacking on expansion" [ref=e491]: "?"
                    - generic [ref=e494] [cursor=pointer]:
                      - checkbox "false" [ref=e496]
                      - generic [ref=e499]: "false"
                  - generic [ref=e500]:
                    - generic [ref=e501]:
                      - generic [ref=e502]: enableLocking
                      - generic "Enable Pattern-Lock security for sensitive items" [ref=e503]: "?"
                    - generic [ref=e506] [cursor=pointer]:
                      - checkbox "false" [ref=e508]
                      - generic [ref=e511]: "false"
                  - generic [ref=e512]:
                    - generic [ref=e513]:
                      - generic [ref=e514]: enableNested
                      - generic "Enable nested accordion support" [ref=e515]: "?"
                    - generic [ref=e518] [cursor=pointer]:
                      - checkbox "false" [ref=e520]
                      - generic [ref=e523]: "false"
                  - generic [ref=e524]:
                    - generic [ref=e525]:
                      - generic [ref=e526]: enableParallax
                      - generic "Enable 3D Parallax depth effect on hover (Premium themes only)" [ref=e527]: "?"
                    - generic [ref=e530] [cursor=pointer]:
                      - checkbox "false" [ref=e532]
                      - generic [ref=e535]: "false"
                  - generic [ref=e536]:
                    - generic [ref=e537]:
                      - generic [ref=e538]: enablePersistence
                      - generic "Save state to localStorage" [ref=e539]: "?"
                    - generic [ref=e542] [cursor=pointer]:
                      - checkbox "false" [ref=e544]
                      - generic [ref=e547]: "false"
                  - generic [ref=e548]:
                    - generic [ref=e549]:
                      - generic [ref=e550]: enablePortalReader
                      - generic "Enable full-screen 'Reading Portal' mode for deep-focus content analysis" [ref=e551]: "?"
                    - generic [ref=e554] [cursor=pointer]:
                      - checkbox "false" [ref=e556]
                      - generic [ref=e559]: "false"
                  - generic [ref=e560]:
                    - generic [ref=e561]:
                      - generic [ref=e562]: enableQuickActions
                      - generic "Enable floating Quick Actions toolbar on hover" [ref=e563]: "?"
                    - generic [ref=e566] [cursor=pointer]:
                      - checkbox "false" [ref=e568]
                      - generic [ref=e571]: "false"
                  - generic [ref=e572]:
                    - generic [ref=e573]:
                      - generic [ref=e574]: enableRanking
                      - generic "Automatically rank items based on their usage heat (requires persistState)" [ref=e575]: "?"
                    - generic [ref=e578] [cursor=pointer]:
                      - checkbox "false" [ref=e580]
                      - generic [ref=e583]: "false"
                  - generic [ref=e584]:
                    - generic [ref=e585]:
                      - generic [ref=e586]: enableSearch
                      - generic "Enable search/filter functionality" [ref=e587]: "?"
                    - generic [ref=e590] [cursor=pointer]:
                      - checkbox "false" [ref=e592]
                      - generic [ref=e595]: "false"
                  - generic [ref=e596]:
                    - generic [ref=e597]:
                      - generic [ref=e598]: enableSearchHeatmap
                      - generic "Enable a visual search \"Mini-map\" (Heatmap) on the right side" [ref=e599]: "?"
                    - generic [ref=e602] [cursor=pointer]:
                      - checkbox "false" [ref=e604]
                      - generic [ref=e607]: "false"
                  - generic [ref=e608]:
                    - generic [ref=e609]:
                      - generic [ref=e610]: enableSnapshots
                      - generic "Enable Workflow 'Snapshots' (save/load open states)" [ref=e611]: "?"
                    - generic [ref=e614] [cursor=pointer]:
                      - checkbox "false" [ref=e616]
                      - generic [ref=e619]: "false"
                  - generic [ref=e620]:
                    - generic [ref=e621]:
                      - generic [ref=e622]: enableSparklines
                      - generic "Enable high-precision header sparklines for analytical data" [ref=e623]: "?"
                    - generic [ref=e626] [cursor=pointer]:
                      - checkbox "false" [ref=e628]
                      - generic [ref=e631]: "false"
                  - generic [ref=e632]:
                    - generic [ref=e633]:
                      - generic [ref=e634]: enableStreaming
                      - generic "Enable real-time, auto-scrolling telemetry terminals inside items" [ref=e635]: "?"
                    - generic [ref=e638] [cursor=pointer]:
                      - checkbox "false" [ref=e640]
                      - generic [ref=e643]: "false"
                  - generic [ref=e644]:
                    - generic [ref=e645]:
                      - generic [ref=e646]: enableTeleportation
                      - generic "Enable Smart-Link 'Teleportation' between accordion sections" [ref=e647]: "?"
                    - generic [ref=e650] [cursor=pointer]:
                      - checkbox "false" [ref=e652]
                      - generic [ref=e655]: "false"
                  - generic [ref=e656]:
                    - generic [ref=e657]:
                      - generic [ref=e658]: enableVoiceControl
                      - generic "Enable Voice-Activated industrial navigation (Hands-Free)" [ref=e659]: "?"
                    - generic [ref=e662] [cursor=pointer]:
                      - checkbox "false" [ref=e664]
                      - generic [ref=e667]: "false"
                  - generic [ref=e668]:
                    - generic [ref=e669]:
                      - generic [ref=e670]: haptic
                      - generic "Enable haptic feedback on interaction" [ref=e671]: "?"
                    - generic [ref=e674] [cursor=pointer]:
                      - checkbox "true" [checked] [ref=e676]
                      - generic [ref=e679]: "true"
                  - generic [ref=e680]:
                    - generic [ref=e681]:
                      - generic [ref=e682]: hideArrow
                      - generic "Hide arrow icon completely" [ref=e683]: "?"
                    - generic [ref=e686] [cursor=pointer]:
                      - checkbox "false" [ref=e688]
                      - generic [ref=e691]: "false"
                  - generic [ref=e692]:
                    - generic [ref=e693]:
                      - generic [ref=e694]: lazyRender
                      - generic "Only render accordion content when it is first opened (Performance)" [ref=e695]: "?"
                    - generic [ref=e698] [cursor=pointer]:
                      - checkbox "false" [ref=e700]
                      - generic [ref=e703]: "false"
                  - generic [ref=e704]:
                    - generic [ref=e705]:
                      - generic [ref=e706]: loading
                      - generic "Show global skeleton loading state" [ref=e707]: "?"
                    - generic [ref=e710] [cursor=pointer]:
                      - checkbox "false" [ref=e712]
                      - generic [ref=e715]: "false"
                  - generic [ref=e716]:
                    - generic [ref=e717]:
                      - generic [ref=e718]: multiple
                      - generic "Allow multiple items to be open at once" [ref=e719]: "?"
                    - generic [ref=e722] [cursor=pointer]:
                      - checkbox "false" [ref=e724]
                      - generic [ref=e727]: "false"
                  - generic [ref=e728]:
                    - generic [ref=e729]:
                      - generic [ref=e730]: printExpandAll
                      - generic "Automatically expand all items and hide interactive controls when printing" [ref=e731]: "?"
                    - generic [ref=e734] [cursor=pointer]:
                      - checkbox "false" [ref=e736]
                      - generic [ref=e739]: "false"
                  - generic [ref=e740]:
                    - generic [ref=e741]:
                      - generic [ref=e742]: rtl
                      - generic "Right-to-left mode" [ref=e743]: "?"
                    - generic [ref=e746] [cursor=pointer]:
                      - checkbox "false" [ref=e748]
                      - generic [ref=e751]: "false"
                  - generic [ref=e752]:
                    - generic [ref=e753]:
                      - generic [ref=e754]: showBreadcrumbs
                      - generic "Show a navigation trail (breadcrumbs) for nested items in their headers" [ref=e755]: "?"
                    - generic [ref=e758] [cursor=pointer]:
                      - checkbox "false" [ref=e760]
                      - generic [ref=e763]: "false"
                  - generic [ref=e764]:
                    - generic [ref=e765]:
                      - generic [ref=e766]: showNumbers
                      - generic "Show numbered indicators above the accordion" [ref=e767]: "?"
                    - generic [ref=e770] [cursor=pointer]:
                      - checkbox "false" [ref=e772]
                      - generic [ref=e775]: "false"
                  - generic [ref=e776]:
                    - generic [ref=e777]:
                      - generic [ref=e778]: stickyHeaders
                      - generic "Pin headers to the top during long content scrolls" [ref=e779]: "?"
                    - generic [ref=e782] [cursor=pointer]:
                      - checkbox "false" [ref=e784]
                      - generic [ref=e787]: "false"
            - generic [ref=e788]:
              - heading "Open Layout & Variants (10)" [level=3] [ref=e789]:
                - button "Open Layout & Variants (10)" [ref=e791] [cursor=pointer]:
                  - generic [ref=e796]:
                    - generic [ref=e800]: Layout & Variants (10)
                    - generic [ref=e801]:
                      - generic:
                        - generic:
                          - generic:
                            - img
              - region:
                - generic [ref=e803]:
                  - generic [ref=e804]:
                    - generic [ref=e805]:
                      - generic [ref=e806]: animationTiming
                      - generic "Animation timing function" [ref=e807]: "?"
                    - combobox "Select..." [ref=e810] [cursor=pointer]:
                      - generic [ref=e811]: ease
                      - img [ref=e816]
                  - generic [ref=e818]:
                    - generic [ref=e819]:
                      - generic [ref=e820]: headerLevel
                      - generic "Header heading level (1-6) for accessibility" [ref=e821]: "?"
                    - combobox "Select..." [ref=e824] [cursor=pointer]:
                      - generic [ref=e825]: "3"
                      - img [ref=e830]
                  - generic [ref=e832]:
                    - generic [ref=e833]:
                      - generic [ref=e834]: iconLibrary
                      - generic "Default library to use for icons (e.g., 'se', 'fontawesome', 'lucide', 'emoji', etc.)" [ref=e835]: "?"
                    - combobox "Select..." [ref=e838] [cursor=pointer]:
                      - generic [ref=e839]: lucide
                      - img [ref=e844]
                  - generic [ref=e846]:
                    - generic [ref=e847]:
                      - generic [ref=e848]: iconPosition
                      - 'generic "Position of the expand icon: ''start'' | ''end''" [ref=e849]': "?"
                    - combobox "Select..." [ref=e852] [cursor=pointer]:
                      - generic [ref=e853]: end
                      - img [ref=e858]
                  - generic [ref=e860]:
                    - generic [ref=e861]:
                      - generic [ref=e862]: physics
                      - generic "Creative/Motion Variants" [ref=e863]: "?"
                    - combobox "Select..." [ref=e866] [cursor=pointer]:
                      - generic [ref=e867]: standard
                      - img [ref=e872]
                  - generic [ref=e874]:
                    - generic [ref=e875]:
                      - generic [ref=e876]: scrollBehavior
                      - generic "Scrolling behavior when autoScroll is enabled" [ref=e877]: "?"
                    - combobox "Select..." [ref=e880] [cursor=pointer]:
                      - generic [ref=e881]: smooth
                      - img [ref=e886]
                  - generic [ref=e888]:
                    - generic [ref=e889]:
                      - generic [ref=e890]: selectionPosition
                      - 'generic "Position of the selection indicator: ''left'' | ''top'' | ''none''" [ref=e891]': "?"
                    - combobox "Select..." [ref=e894] [cursor=pointer]:
                      - generic [ref=e895]: left
                      - img [ref=e900]
                  - generic [ref=e902]:
                    - generic [ref=e903]:
                      - generic [ref=e904]: size
                      - 'generic "Size of the accordion: ''sm'' | ''md'' | ''lg''" [ref=e905]': "?"
                    - combobox "Select..." [ref=e908] [cursor=pointer]:
                      - generic [ref=e909]: md
                      - img [ref=e914]
                  - generic [ref=e916]:
                    - generic [ref=e917]:
                      - generic [ref=e918]: theme
                      - 'generic "Visual theme: ''default'' | ''glass'' | ''radiant''" [ref=e919]': "?"
                    - combobox "Select..." [ref=e922] [cursor=pointer]:
                      - generic [ref=e923]: default
                      - img [ref=e928]
                  - generic [ref=e930]:
                    - generic [ref=e931]:
                      - generic [ref=e932]: variant
                      - 'generic "Accordion variant: ''default'' | ''bordered'' | ''splitted'' | ''light'' | ''shadow'' | ''card'' | ''card-list'' | ''headline'' Use ''card'' or ''card-list'' for a separated card layout with icon pills and a right-chevron. Use ''headline'' for a minimalist, high-impact typography-first layout." [ref=e933]': "?"
                    - combobox "Select..." [ref=e936] [cursor=pointer]:
                      - generic [ref=e937]: default
                      - img [ref=e942]
            - generic [ref=e944]:
              - heading "Open Content & Text (8)" [level=3] [ref=e945]:
                - button "Open Content & Text (8)" [ref=e947] [cursor=pointer]:
                  - generic [ref=e952]:
                    - generic [ref=e956]: Content & Text (8)
                    - generic [ref=e957]:
                      - generic:
                        - generic:
                          - generic:
                            - img
              - region:
                - generic [ref=e959]:
                  - generic [ref=e960]:
                    - generic [ref=e961]:
                      - generic [ref=e962]: arrowIconCollapsed
                      - generic "Custom arrow icon for collapsed state" [ref=e963]: "?"
                    - textbox "Arrow Icon Collapsed" [ref=e968]: chevron-right
                  - generic [ref=e969]:
                    - generic [ref=e970]:
                      - generic [ref=e971]: arrowIconExpanded
                      - generic "Custom arrow icon for expanded state" [ref=e972]: "?"
                    - textbox "Arrow Icon Expanded" [ref=e977]: chevron-down
                  - generic [ref=e978]:
                    - generic [ref=e979]:
                      - generic [ref=e980]: backgroundColor
                      - generic "Background color of the accordion" [ref=e981]: "?"
                    - textbox "Background Color" [ref=e986]: white
                  - generic [ref=e987]:
                    - generic [ref=e988]:
                      - generic [ref=e989]: persistState
                      - generic "Enable state persistence - if provided, the string will be used as a localStorage key" [ref=e990]: "?"
                    - textbox "Persist State" [ref=e995]
                  - generic [ref=e996]:
                    - generic [ref=e997]:
                      - generic [ref=e998]: persistenceKey
                      - generic "localStorage key for persistence" [ref=e999]: "?"
                    - textbox "Persistence Key" [ref=e1004]: ui-accordion-state
                  - generic [ref=e1005]:
                    - generic [ref=e1006]:
                      - generic [ref=e1007]: searchPlaceholder
                      - generic "Search input placeholder" [ref=e1008]: "?"
                    - textbox "Search Placeholder" [ref=e1013]: Search...
                  - generic [ref=e1014]:
                    - generic [ref=e1015]:
                      - generic [ref=e1016]: selectedHeaderColor
                      - 'generic "Custom color for selected header (default: #10b981)" [ref=e1017]': "?"
                    - textbox "Selected Header Color" [ref=e1022]: "#10b981"
                  - generic [ref=e1023]:
                    - generic [ref=e1024]:
                      - generic [ref=e1025]: syncGroup
                      - generic "Optional name for a synchronization group. All accordions with the same group name will synchronize their toggle states globally." [ref=e1026]: "?"
                    - textbox "Sync Group" [ref=e1031]
            - generic [ref=e1032]:
              - heading "Open Advanced Configuration (6)" [level=3] [ref=e1033]:
                - button "Open Advanced Configuration (6)" [ref=e1035] [cursor=pointer]:
                  - generic [ref=e1040]:
                    - generic [ref=e1044]: Advanced Configuration (6)
                    - generic [ref=e1045]:
                      - generic:
                        - generic:
                          - generic:
                            - img
              - region:
                - generic [ref=e1047]:
                  - generic [ref=e1048]:
                    - generic [ref=e1049]:
                      - generic [ref=e1050]: animationDuration
                      - generic "Animation duration in milliseconds" [ref=e1051]: "?"
                    - generic [ref=e1052]:
                      - generic [ref=e1055]:
                        - img [ref=e1061]
                        - spinbutton [ref=e1065]: "300"
                      - slider [ref=e1066] [cursor=pointer]: "100"
                  - generic [ref=e1067]:
                    - generic [ref=e1068]:
                      - generic [ref=e1069]: columns
                      - generic "Grid columns count for accordion items (Large screens only)" [ref=e1070]: "?"
                    - generic [ref=e1071]:
                      - generic [ref=e1074]:
                        - img [ref=e1080]
                        - spinbutton [ref=e1084]: "1"
                      - slider [ref=e1085] [cursor=pointer]: "1"
                  - generic [ref=e1086]:
                    - generic [ref=e1087]:
                      - generic [ref=e1088]: defaultOpen
                      - generic "IDs of items that should be open by default" [ref=e1089]: "?"
                    - textbox [ref=e1091]: "[]"
                  - generic [ref=e1092]:
                    - generic [ref=e1093]:
                      - generic [ref=e1094]: expandedItems
                      - generic "Controlled open items (overrides internal state if provided)" [ref=e1095]: "?"
                    - textbox [ref=e1097]: "null"
                  - generic [ref=e1098]:
                    - generic [ref=e1099]:
                      - generic [ref=e1100]: focusTimeout
                      - generic "Automatically collapse sections after X milliseconds of inactivity (0 to disable)" [ref=e1101]: "?"
                    - generic [ref=e1102]:
                      - generic [ref=e1105]:
                        - img [ref=e1111]
                        - spinbutton [ref=e1115]: "0"
                      - slider [ref=e1116] [cursor=pointer]: "0"
                  - generic [ref=e1117]:
                    - generic [ref=e1118]:
                      - generic [ref=e1119]: items
                      - generic "Array of accordion items" [ref=e1120]: "?"
                    - textbox [ref=e1122]: "[ { \"id\": \"1\", \"title\": \"Item 1\", \"content\": \"Content for item 1\" }, { \"id\": \"2\", \"title\": \"Item 2\", \"content\": \"Content for item 2\" } ]"
          - button "Reset to Defaults" [ref=e1124] [cursor=pointer]:
            - generic [ref=e1126]:
              - img [ref=e1132]
              - generic [ref=e1136]:
                - generic: Reset to Defaults
```

# Test source

```ts
  1   | import { type Page, expect } from '@playwright/test';
  2   | 
  3   | /**
  4   |  * Navigate to the app root and wait for the navigation bar to be ready.
  5   |  */
  6   | export async function gotoApp(page: Page): Promise<void> {
  7   |   await page.goto('/');
  8   |   // Wait for the custom nav element to be attached
  9   |   await page.waitForSelector('ui-navigation-bar', { state: 'attached', timeout: 15_000 });
  10  |   // Short pause for Stencil components to hydrate
  11  |   await page.waitForTimeout(400);
  12  | }
  13  | 
  14  | /**
  15  |  * Navigate to a component page by dispatching the navItemClick event that
  16  |  * the React app listens to on the ui-navigation-bar element.
  17  |  */
  18  | export async function navigateToComponent(page: Page, componentId: string): Promise<void> {
  19  |   await page.evaluate((id) => {
  20  |     const nav = document.querySelector('ui-navigation-bar');
  21  |     if (!nav) throw new Error('ui-navigation-bar not found in DOM');
  22  |     nav.dispatchEvent(
  23  |       new CustomEvent('navItemClick', {
  24  |         bubbles: true,
  25  |         composed: true,
  26  |         detail: { id },
  27  |       }),
  28  |     );
  29  |   }, componentId);
  30  |   // Allow lazy-loaded page component and web components to mount
  31  |   await page.waitForTimeout(200);
  32  | }
  33  | 
  34  | /**
  35  |  * Wait for a web component tag to be visible inside the preview stage.
  36  |  * Targets only the preview panel, not the playground's own UI elements.
  37  |  */
  38  | export async function waitForPreviewComponent(
  39  |   page: Page,
  40  |   tagName: string,
  41  | ): Promise<void> {
  42  |   await page.waitForSelector(`.cp-preview-content ${tagName}`, {
  43  |     state: 'attached',
  44  |     timeout: 10_000,
  45  |   });
  46  | }
  47  | 
  48  | /**
  49  |  * Read an attribute value off a web-component host element inside the preview.
  50  |  */
  51  | export async function getPreviewAttr(
  52  |   page: Page,
  53  |   tagName: string,
  54  |   attr: string,
  55  | ): Promise<string | null> {
> 56  |   return page.evaluate(
      |               ^ Error: page.evaluate: Execution context was destroyed, most likely because of a navigation
  57  |     ([tag, a]) => document.querySelector(`.cp-preview-content ${tag}`)?.getAttribute(a) ?? null,
  58  |     [tagName, attr] as [string, string],
  59  |   );
  60  | }
  61  | 
  62  | /**
  63  |  * Set an attribute on the first matching web-component in the preview area.
  64  |  */
  65  | export async function setPreviewAttr(
  66  |   page: Page,
  67  |   tagName: string,
  68  |   attr: string,
  69  |   value: string | null,
  70  | ): Promise<void> {
  71  |   await page.evaluate(
  72  |     ([tag, a, v]) => {
  73  |       const el = document.querySelector(`.cp-preview-content ${tag}`);
  74  |       if (!el) throw new Error(`${tag} not found in preview`);
  75  |       if (v === null) el.removeAttribute(a);
  76  |       else el.setAttribute(a, v);
  77  |     },
  78  |     [tagName, attr, value] as [string, string, string | null],
  79  |   );
  80  | }
  81  | 
  82  | /**
  83  |  * Dispatch a click through JS on the host element (bypasses Playwright's
  84  |  * default pointer restrictions on disabled elements if needed for assertions).
  85  |  */
  86  | export async function jsClick(page: Page, selector: string): Promise<void> {
  87  |   await page.evaluate((sel) => {
  88  |     (document.querySelector(sel) as HTMLElement)?.click();
  89  |   }, selector);
  90  | }
  91  | 
  92  | /**
  93  |  * Listen for a specific custom event on a web component, click it, and return
  94  |  * whether the event fired within the timeout.
  95  |  */
  96  | export async function expectCustomEvent(
  97  |   page: Page,
  98  |   hostSelector: string,
  99  |   eventName: string,
  100 |   triggerFn: () => Promise<void>,
  101 | ): Promise<boolean> {
  102 |   const eventFired = page.evaluate(
  103 |     ([sel, ev]) =>
  104 |       new Promise<boolean>((resolve) => {
  105 |         const el = document.querySelector(sel);
  106 |         if (!el) { resolve(false); return; }
  107 |         const handler = () => { resolve(true); };
  108 |         el.addEventListener(ev, handler, { once: true });
  109 |         setTimeout(() => resolve(false), 4_000);
  110 |       }),
  111 |     [hostSelector, eventName] as [string, string],
  112 |   );
  113 |   await triggerFn();
  114 |   return eventFired;
  115 | }
  116 | 
```