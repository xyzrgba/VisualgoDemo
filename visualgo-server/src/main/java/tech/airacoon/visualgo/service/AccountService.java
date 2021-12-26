package tech.airacoon.visualgo.service;

import tech.airacoon.visualgo.pojo.Account;
import tech.airacoon.visualgo.pojo.AccountView;
import tech.airacoon.visualgo.pojo.Role;

import java.util.List;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 账户的service的接口
 */
public interface AccountService {
    /**
     * @return
     */
    List<Role> getRoles();

    /**
     * @param email
     * @return
     */
    AccountView getAccountByEmail(String email);

    /**
     * @param id
     * @return
     */
    AccountView getAccountById(Integer id);

    /**
     * @param name
     * @return
     */
    AccountView getAccountByName(String name);

    /**
     * 返回受影响的行数
     *
     * @param account
     * @return
     */
    Integer regAccount(Account account);

    Integer updateAccountInfoByEmail(Account account);

    Integer updatePassword(Account account);

    List<AccountView> getAllAccounts(Account account);

    Integer updateAccountInfoById(Account account);
}
