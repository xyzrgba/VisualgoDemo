package tech.airacoon.visualgo.config;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import tech.airacoon.visualgo.pojo.AccountView;
import tech.airacoon.visualgo.service.AccountService;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 授权和验证
 */
public class AuthRealm extends AuthorizingRealm {
    private Logger logger = LoggerFactory.getLogger(AuthRealm.class);
    @Autowired
    private AccountService accountService;

    /**
     * 重写授权方式
     * @param principalCollection
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
//        String email = (String) principalCollection.getPrimaryPrincipal();//获取登录邮箱
        AccountView accountView =(AccountView) principalCollection.getPrimaryPrincipal();
//        AccountView account = accountService.getAccountByEmail(email);//获取用户数据
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        authorizationInfo.addRole(accountView.getRole().getName());
        logger.info("角色名: " + accountView.getRole().getName());
        return authorizationInfo;
    }

    /**
     * 重写验证方式
     * @param authenticationToken
     * @return
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        if (authenticationToken.getPrincipal() != null) {
            String email = authenticationToken.getPrincipal().toString();
            AccountView account = accountService.getAccountByEmail(email);
            logger.info(account.toString());
            if (account != null) {
                SimpleAuthenticationInfo simpleAuthenticationInfo = new SimpleAuthenticationInfo(account, account.getPassword(), this.getClass().getName());
                return simpleAuthenticationInfo;
            }
        }
        return null;
    }
}
