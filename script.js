document.addEventListener('DOMContentLoaded', function () {
  const phoneList = document.getElementById('phoneList');
  const generateBtn = document.getElementById('generateBtn');

  // 国家特定格式生成函数
  function generatePhoneNumber(country) {
    switch (country) {
      case 'china':
        return generateChineseNumber();
      case 'india':
        return generateIndianNumber();
      case 'us':
        return generateUSNumber();
      case 'indonesia':
        return generateIndonesianNumber();
      case 'brazil':
        return generateBrazilianNumber();
      case 'russia':
        return generateRussianNumber();
      case 'japan':
        return generateJapaneseNumber();
      case 'mexico':
        return generateMexicanNumber();
      case 'uk':
        return generateUKNumber();
      case 'germany':
        return generateGermanNumber();
      default:
        return generateDefaultNumber();
    }
  }

  // 生成并显示5个号码
  function generatePhoneNumbers(country) {
    const numbers = [];
    for (let i = 0; i < 5; i++) {
      numbers.push(generatePhoneNumber(country));
    }

    phoneList.innerHTML = `
            <ul>
                ${numbers.map(num => `
                    <li>
                        ${formatNumber(country, num)}
                        <button class="copy-btn" data-number="${formatNumberForCopy(country, num)}">Copy</button>
                    </li>
                `).join('')}
            </ul>
        `;

    setupCopyButtons();
  }

  // 设置复制按钮功能
  function setupCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        if (this.classList.contains('copied')) return;

        const number = this.getAttribute('data-number');
        navigator.clipboard.writeText(number).then(() => {
          this.classList.add('copied');
          this.textContent = 'Copied!';
          setTimeout(() => {
            this.classList.remove('copied');
            this.textContent = 'Copy';
          }, 2000);
        });
      });
    });
  }

  // 初始生成号码 (根据页面自动检测国家)
  const country = detectCountryFromPage();
  generatePhoneNumbers(country);

  // 重新生成按钮事件
  generateBtn.addEventListener('click', function () {
    generatePhoneNumbers(country);
  });

  // 检测当前页面国家
  function detectCountryFromPage() {
    const path = window.location.pathname;
    if (path.includes('china')) return 'china';
    if (path.includes('india')) return 'india';
    if (path.includes('us') || path.includes('usa')) return 'us';
    if (path.includes('indonesia')) return 'indonesia';
    if (path.includes('brazil')) return 'brazil';
    if (path.includes('russia')) return 'russia';
    if (path.includes('japan')) return 'japan';
    if (path.includes('mexico')) return 'mexico';
    if (path.includes('uk') || path.includes('united-kingdom')) return 'uk';
    if (path.includes('germany')) return 'germany';
    return 'default';
  }
});

// 中国号码生成 (+86 1XXXXXXXXXX)
function generateChineseNumber() {
  const prefix = '1' + (Math.floor(Math.random() * 7) + 3); // 1[3-9]
  let suffix = '';
  for (let i = 0; i < 8; i++) {
    suffix += Math.floor(Math.random() * 10);
  }
  return '86' + prefix + suffix;
}

// 印度号码生成 (+91 XXXXXXXXXX)
function generateIndianNumber() {
  const prefixes = ['6', '7', '8', '9']; // 更新后的前缀范围
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  let number = prefix;

  // 生成剩余9位数字
  for (let i = 0; i < 9; i++) {
    number += Math.floor(Math.random() * 10);
  }

  return '91' + number; // 印度国家代码+10位数字
}

// 美国号码生成 (+1 XXX XXX XXXX)
function generateUSNumber() {
  // 有效区号范围：201-999（排除555）
  const areaCode = Math.floor(201 + Math.random() * 799);
  let number = areaCode.toString();

  // 生成7位本地号码（第1位避免0或1）
  for (let i = 0; i < 7; i++) {
    if (i === 0) {
      // 本地号码第1位（即整个号码的第4位）避免0或1
      number += Math.floor(2 + Math.random() * 8); // 2-9
    } else {
      number += Math.floor(Math.random() * 10); // 0-9
    }
  }

  return '1' + number; // 美国国家代码 + 10位数字
}

// 印度尼西亚号码生成 (+62 XXX XXXX XXXX)
function generateIndonesianNumber() {
  // 更完整的印尼手机号前缀（主流运营商：Telkomsel, XL, Indosat, 3, Smartfren 等）
  const prefixes = [
    '811', '812', '813', '817', '818', '819',
    '821', '822', '823', '828', '852', '853',
    '855', '856', '857', '858', '859', '877',
    '878', '881', '882', '883', '884', '885',
    '886', '887', '888', '889', '895', '896',
    '897', '898', '899'
  ];

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  let number = prefix;

  // 生成7位用户号码（第1位避免0）
  for (let i = 0; i < 7; i++) {
    if (i === 0) {
      number += Math.floor(1 + Math.random() * 9); // 1-9
    } else {
      number += Math.floor(Math.random() * 10); // 0-9
    }
  }

  return '62' + number; // 印尼国家代码 + 10位数字
}

// 巴西号码生成 (+55 XX XXXX XXXX)
function generateBrazilianNumber() {
  // 巴西真实存在的区号（部分示例）
  const validAreaCodes = [
    11, 12, 13, 14, 15, 16, 17, 18, 19,
    21, 22, 24, 27, 28, 31, 32, 33, 34,
    35, 37, 38, 41, 42, 43, 44, 45, 46,
    47, 48, 49, 51, 53, 54, 55, 61, 62,
    63, 64, 65, 66, 67, 68, 69, 71, 73,
    74, 75, 77, 79, 81, 82, 83, 84, 85,
    86, 87, 88, 89, 91, 92, 93, 94, 95,
    96, 97, 98, 99
  ];

  // 随机选择区号
  const areaCode = validAreaCodes[Math.floor(Math.random() * validAreaCodes.length)];
  let number = areaCode.toString();

  // 随机决定是手机（9位）还是固定电话（8位）
  const isMobile = Math.random() > 0.5;

  if (isMobile) {
    // 手机号码：第1位是9，后面7位随机
    number += '9';
    for (let i = 0; i < 7; i++) {
      number += Math.floor(Math.random() * 10);
    }
  } else {
    // 固定电话：8位随机（首位通常不为0）
    number += Math.floor(1 + Math.random() * 9); // 首位1-9
    for (let i = 0; i < 7; i++) {
      number += Math.floor(Math.random() * 10);
    }
  }

  return '55' + number; // 巴西国家代码 + 区号 + 本地号码
}

// 俄罗斯号码生成 (+7 XXX XXX XX XX)
function generateRussianNumber() {
  // 俄罗斯移动号码前缀（更完整的范围）
  const mobilePrefixes = [
    '900', '901', '902', '903', '904', '905', '906', '907', '908', '909',
    '910', '911', '912', '913', '914', '915', '916', '917', '918', '919',
    '920', '921', '922', '923', '924', '925', '926', '927', '928', '929',
    '930', '931', '932', '933', '934', '935', '936', '937', '938', '939',
    '940', '941', '942', '943', '944', '945', '946', '947', '948', '949',
    '950', '951', '952', '953', '954', '955', '956', '957', '958', '959',
    '960', '961', '962', '963', '964', '965', '966', '967', '968', '969',
    '970', '971', '972', '973', '974', '975', '976', '977', '978', '979',
    '980', '981', '982', '983', '984', '985', '986', '987', '988', '989',
    '990', '991', '992', '993', '994', '995', '996', '997', '998', '999'
  ];

  // 随机选择移动号码前缀
  const prefix = mobilePrefixes[Math.floor(Math.random() * mobilePrefixes.length)];
  let number = prefix;

  // 生成7位用户号码（第1位避免0）
  for (let i = 0; i < 7; i++) {
    if (i === 0) {
      number += Math.floor(1 + Math.random() * 9); // 1-9
    } else {
      number += Math.floor(Math.random() * 10); // 0-9
    }
  }

  return '7' + number; // 俄罗斯国家代码 + 10位数字
}
// 日本号码生成 (+81 XX XXXX XXXX)
function generateJapaneseNumber() {
  // 日本移动号码前缀（更完整的范围）
  const mobilePrefixes = [
    '50', '60', '70', '80', '90', // 主要运营商
    '20', '30', '40' // 虚拟运营商
  ];

  // 随机选择移动号码前缀
  const prefix = mobilePrefixes[Math.floor(Math.random() * mobilePrefixes.length)];
  let number = prefix;

  // 生成8位用户号码（第1位避免0）
  for (let i = 0; i < 8; i++) {
    if (i === 0) {
      number += Math.floor(1 + Math.random() * 9); // 1-9
    } else {
      number += Math.floor(Math.random() * 10); // 0-9
    }
  }

  return '81' + number; // 日本国家代码 + 10位数字
}

// 墨西哥号码生成 (+52 XXX XXX XXXX)
function generateMexicanNumber() {
  // 墨西哥有效区号（固定电话）
  const landlineAreaCodes = [
    '55', '56', // 墨西哥城
    '33', // 瓜达拉哈拉
    '81', // 蒙特雷
    '664', '662', '668', // 蒂华纳等
    '443', '444', '477', // 其他城市
    '871', '867' // 其他城市
  ];

  // 随机决定是移动号码（1开头）还是固定电话（区号开头）
  const isMobile = Math.random() > 0.5;

  let number;
  if (isMobile) {
    // 移动号码：1 + 2位运营商代码 + 7位用户号码
    number = '1';
    for (let i = 0; i < 9; i++) {
      number += Math.floor(Math.random() * 10);
    }
  } else {
    // 固定电话：随机选择区号
    const areaCode = landlineAreaCodes[Math.floor(Math.random() * landlineAreaCodes.length)];
    number = areaCode;
    // 补全剩余位数（总长10位，包括区号）
    const remainingDigits = 10 - areaCode.length;
    for (let i = 0; i < remainingDigits; i++) {
      number += Math.floor(Math.random() * 10);
    }
  }

  return '52' + number; // 墨西哥国家代码 + 本地号码
}

// 英国号码生成 (+44 XX XXXX XXXX)
function generateUKMobileNumber() {
  // 英国移动号码统一以7开头
  let number = '7';

  // 生成剩余9位数字（第二位通常不为0）
  for (let i = 0; i < 9; i++) {
    if (i === 0) {
      number += Math.floor(1 + Math.random() * 9); // 第二位1-9
    } else {
      number += Math.floor(Math.random() * 10); // 其他位0-9
    }
  }

  return '44' + number; // 国际格式
}

// 德国号码生成 (+49 XXX XXXXXXX)
function generateGermanNumber() {
  // 更完整的德国移动号段（前导0已包含）
  const mobilePrefixes = [
    '0151', '0152', '0157', '0159',
    '0160', '0162', '0163',
    '0170', '0171', '0172', '0173', '0174', '0175', '0176', '0177', '0178', '0179'
  ];

  const prefix = mobilePrefixes[Math.floor(Math.random() * mobilePrefixes.length)];
  let number = prefix;

  // 计算剩余位数（总长11位，含前缀）
  const remainingDigits = 11 - prefix.length;
  for (let i = 0; i < remainingDigits; i++) {
    number += Math.floor(Math.random() * 10);
  }

  return '49' + number.slice(1); // 移除前导0的国际格式
}

// 默认号码生成
function generateDefaultNumber() {
  let number = '';
  for (let i = 0; i < 10; i++) {
    number += Math.floor(Math.random() * 10);
  }
  return number;
}

// 根据国家格式化显示号码
function formatNumber(country, rawNumber) {
  // 验证输入
  if (!rawNumber || typeof rawNumber !== 'string') return rawNumber;

  const countryCode = rawNumber.substring(0, 2);
  const mainNumber = rawNumber.substring(2);

  switch (country.toLowerCase()) {
    case 'china':
      return `+${countryCode} ${mainNumber.substring(0, 3)} ${mainNumber.substring(3, 7)} ${mainNumber.substring(7)}`;
    case 'india':
      return `+${countryCode} ${mainNumber.substring(0, 4)} ${mainNumber.substring(4, 7)} ${mainNumber.substring(7)}`;
    case 'us':
      return `+${countryCode} (${mainNumber.substring(0, 3)}) ${mainNumber.substring(3, 6)}-${mainNumber.substring(6)}`;
    case 'indonesia':
      return `+${countryCode} ${mainNumber.substring(0, 3)}-${mainNumber.substring(3, 6)}-${mainNumber.substring(6)}`;
    case 'brazil':
      return `+${countryCode} (${mainNumber.substring(0, 2)}) ${mainNumber.substring(2, 7)}-${mainNumber.substring(7)}`;
    case 'russia':
      return `+${countryCode} (${mainNumber.substring(0, 3)}) ${mainNumber.substring(3, 6)}-${mainNumber.substring(6)}`;
    case 'japan':
      return `+${countryCode} ${mainNumber.substring(0, 3)}-${mainNumber.substring(3, 6)}-${mainNumber.substring(6)}`;
    case 'mexico':
      return `+${countryCode} ${mainNumber.substring(0, 2)} ${mainNumber.substring(2, 6)} ${mainNumber.substring(6)}`;
    case 'uk':
      return `+${countryCode} ${mainNumber.substring(0, 4)} ${mainNumber.substring(4, 7)} ${mainNumber.substring(7)}`;
    case 'germany':
      return `+${countryCode} ${mainNumber.substring(0, 3)}-${mainNumber.substring(3, 6)}-${mainNumber.substring(6)}`;
    default:
      // 默认格式：每3位一组
      return `+${rawNumber.replace(/(\d{3})(?=\d)/g, '$1 ')}`;
  }
}

// 为复制功能格式化号码（不带空格和分隔符）
function formatNumberForCopy(country, rawNumber) {
  return `+${rawNumber}`;
}



// 当DOM内容加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
  // 获取所有导航链接元素
  const navLinks = document.querySelectorAll('.country-list a');

  // 设置活动链接状态的函数
  function setActiveLink(clickedLink) {
    // 移除所有链接的active类
    navLinks.forEach(link => {
      link.classList.remove('active');  // 移除active类
      link.style.backgroundColor = '#f5f5f5'; // 恢复默认背景色
      link.style.color = '#333';       // 恢复默认文字颜色
    });

    // 为点击的链接添加active类
    clickedLink.classList.add('active');
    clickedLink.style.backgroundColor = '#333'; // 设置活动状态背景色(蓝色)
    clickedLink.style.color = '#ffffff';          // 设置活动状态文字颜色(白色)
  }

  // 为所有链接添加点击事件监听器
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      // 如果需要手动处理导航，可以取消默认行为
      // e.preventDefault();
      setActiveLink(this);  // 设置点击的链接为活动状态

      // 如果使用客户端路由，可以在这里添加路由逻辑
      // 否则会继续正常的链接跳转行为
    });
  });

  // 根据当前页面设置初始活动状态
  const currentPage = window.location.pathname.split('/').pop(); // 获取当前页面文件名
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href'); // 获取链接的href属性
    // 检查当前页面是否匹配链接
    if (currentPage === linkPage ||
      (currentPage.includes('china') && linkPage.includes('china'))) {
      setActiveLink(link);  // 设置匹配的链接为活动状态
    }
  });
});

document.getElementById('current-year').textContent = new Date().getFullYear();